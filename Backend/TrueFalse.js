const mongoose = require("mongoose");


const questionSchema = new mongoose.Schema({
    question : {
        type:String,
        required:true
    },
    answer : {
        type:String,
        required:true
    }
})

const Question = new mongoose.model('TrueFalseQuestion', questionSchema);

module.exports = Question;