const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
    question : {
        type:String,
        required:true
    },
    answer : {
        type:String,
        required:true
    }
})

const Submission = new mongoose.model('Submission', submissionSchema);

module.exports = Submission;