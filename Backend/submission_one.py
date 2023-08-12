import os
import whisper
import re
import gensim
from gensim.models import Word2Vec
import requests

def get_soundex(word):
    # Step 1: Convert the word to uppercase and remove non-letter characters
    word = word.upper()
    word = ''.join(c for c in word if c.isalpha())

    if not word:
        return ''

    # Step 2: Keep the first letter and remove all occurrences of 'A', 'E', 'I', 'O', 'U', 'H', 'W', 'Y'
    first_letter = word[0]
    word = word[1:]
    word = word.replace('A', '')
    word = word.replace('E', '')
    word = word.replace('I', '')
    word = word.replace('O', '')
    word = word.replace('U', '')
    word = word.replace('H', '')
    word = word.replace('W', '')
    word = word.replace('Y', '')

    # Step 3: Replace the remaining letters with digits using the following mapping:
    # - B, F, P, V: 1
    # - C, G, J, K, Q, S, X, Z: 2
    # - D, T: 3
    # - L: 4
    # - M, N: 5
    # - R: 6
    word = word.replace('B', '1')
    word = word.replace('F', '1')
    word = word.replace('P', '1')
    word = word.replace('V', '1')
    word = word.replace('C', '2')
    word = word.replace('G', '2')
    word = word.replace('J', '2')
    word = word.replace('K', '2')
    word = word.replace('Q', '2')
    word = word.replace('S', '2')
    word = word.replace('X', '2')
    word = word.replace('Z', '2')
    word = word.replace('D', '3')
    word = word.replace('T', '3')
    word = word.replace('L', '4')
    word = word.replace('M', '5')
    word = word.replace('N', '5')
    word = word.replace('R', '6')

    # Step 4: Remove adjacent digits that are the same
    previous_digit = ''
    new_word = ''
    for digit in word:
        if digit != previous_digit:
            new_word += digit
            previous_digit = digit
    word = new_word

    # Step 5: Pad the result with zeros until it has four characters
    word = (word + '000')[:4]

    # Step 6: Add the first letter back to the result
    return first_letter + word

def evaluate_answer():
    home_dir = os.path.expanduser("~")
    download_path = os.path.join(home_dir, "Downloads")

    model = whisper.load_model("tiny.en")
    transcribed_question = model.transcribe(f"{download_path}/question.wav")['text']

    highest_score = 0
    question = ""
    answer = ""
    
    response = requests.get("http://0.0.0.0:8080/api/send-oneword")
    data = response.json()["data"]

    for instance in data:
        database_question = instance["question"]

        tokenized_sentence1 = gensim.utils.simple_preprocess(transcribed_question)
        tokenized_sentence2 = gensim.utils.simple_preprocess(database_question)

        # train the word2vec model on the sentences
        model = Word2Vec(
            [tokenized_sentence1, tokenized_sentence2], min_count=1)

        # get similarity score between the two sentences
        similarity_score = model.wv.n_similarity(
            tokenized_sentence1, tokenized_sentence2)
        if similarity_score > highest_score:
            highest_score = similarity_score

    for instance in data:
        database_question = instance["question"]

        tokenized_sentence1 = gensim.utils.simple_preprocess(
            transcribed_question)
        tokenized_sentence2 = gensim.utils.simple_preprocess(database_question)

        # train the word2vec model on the sentences
        model = Word2Vec(
            [tokenized_sentence1, tokenized_sentence2], min_count=1)

        # get similarity score between the two sentences
        similarity_score = model.wv.n_similarity(
            tokenized_sentence1, tokenized_sentence2)
        if similarity_score == highest_score:
            question = database_question
            answer = instance["answer"]

    model = whisper.load_model("tiny.en")
    result = model.transcribe(f"{download_path}/answer.wav")
    alphaResult = result['text']
    res = ''.join(c for c in alphaResult if c.isalnum())
    print(res)

    # Compute the Soundex codes for the words
    answer_soundex = get_soundex(answer)
    result_soundex = get_soundex(res)
    
    correct = False

    if answer_soundex == result_soundex:
        correct = True
    else:
        if answer_soundex[0] == result_soundex[0] and answer_soundex[1] == result_soundex[1]:
            correct = True
        else:
            correct = False
                
    print(question)
    print(answer)
    if correct:
        print("Correct")
    else:
        print("Wrong")

    question_file_path = f"{download_path}/question.wav"
    if os.path.exists(question_file_path):
        os.remove(question_file_path)
    answer_file_path = f"{download_path}/answer.wav"
    if os.path.exists(answer_file_path):
        os.remove(answer_file_path)

        
evaluate_answer()