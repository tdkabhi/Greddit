const express = require("express");
require("./db")
const app = express();
const cors = require("cors");
const Question = require("./TrueFalse")
const OneWord = require("./one")
const Submission = require("./sub")
const {exec} = require("child_process");
app.use(express.json());
app.use(
    cors({
        origin: "*",
    })
);

app.post("/questions", (req, res) =>{
    console.log(req.body)
    const question = new Question(req.body);
    question.save().then(()=>{
        res.send(user);
    }).catch((e) =>{
        res.send(e);
    })
});

app.post("/oneword", (req, res) =>{
    console.log(req.body)
    const question = new OneWord(req.body);
    question.save().then(()=>{
        res.send(user);
    }).catch((e) =>{
        res.send(e);
    })
});

app.post("/api/send-truefalse", (req, res) =>{
    console.log(req.body.question)
    const question = new Submission(req.body);
    question.save().then(()=>{
        res.send(user);
    }).catch((e) =>{
        res.send(e);
    })
});

app.post("/api/send-oneword", (req, res) =>{
    console.log(req.body.question)
    const question = new Submission(req.body);
    question.save().then(()=>{
        res.send(user);
    }).catch((e) =>{
        res.send(e);
    })
});

app.post("/run-python-tf", (req, res) => {
    const { data } = req.body;
  
    exec("python3 submission_tf.py " + data, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return res.status(500).send("Error executing Python code");
      }
      console.log(`${stdout}`);
      res.send(stdout);
    });
});

app.post("/run-python-one", (req, res) => {
    const { data } = req.body;
  
    exec("python3 submission_one.py " + data, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return res.status(500).send("Error executing Python code");
      }
      console.log(`${stdout}`);
      res.send(stdout);
    });
});

app.listen(8000, () => { 
    console.log(`server is running on the port 8000`);
})
