from flask import Flask, jsonify
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient(
    "mongodb+srv://Team33:DASS33AGSP@dass33.gl2aksm.mongodb.net/?retryWrites=true&w=majority")
db = client["test"]
collection = db["truefalsequestions"]


@app.route("/api/send-truefalse", methods=["GET", "POST"])
def get_data():
    data = []
    for item in collection.find():
        data.append({
            "id": str(item["_id"]),
            "question": item["question"],
            "answer": item["answer"],
        })
        
    return jsonify({"data": data})

if __name__ == "__main__":
    app.run(debug=True)