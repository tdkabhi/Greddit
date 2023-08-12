const mongoose = require("mongoose");


const onewordSchema = new mongoose.Schema({
    question : {
        type:String,
        required:true
    },
    answer : {
        type:String,
        required:true
    }
})

const OneWord = new mongoose.model('OneWordQuestion', onewordSchema);

module.exports = OneWord;