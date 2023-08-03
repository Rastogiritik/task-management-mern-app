require("dotenv").config()
const express = require('express');
const Task = require('./database/taskSchema')
const cors = require('cors');
require ('./database/connection');

// setup App with express
const app = express();
const port = process.env.PORT || 6001;


// body/request data ko get krne ke liye
app.use(express.json());


// handling network problem at backend in the app
app.use(cors());


// add task in database
app.post('/addtask', async (req, res) => {
    let task = new Task(req.body);
    let result =await task.save();
    res.send(result);
    
});


// get task data from database
app.get('/tasks', async (req, res) => {
    let tasks = await Task.find();
    if (tasks.length>0) {
      res.send(tasks);
    }else {
        res.send( {result:"No resuult found" });
   }
});


// delete task
app.delete('/deletetask/:id', async (req, res) => {
    let task = await Task.deleteOne({_id:req.params.id});
    res.send(task);
})


// this is the api for filling the update form for the prdoduct which is given by user
app.get('/updatetask/:id', async (req, res) => {
    let result = await Task.findOne({_id:req.params.id});
    if (result) {
        res.send(result);
    }else {
        res.send({result: "No Record Found"});
    }
});


//update task in database
app.put('/updatetask/:id', async (req, res) => {
    let updateTask =await Task.updateOne(
        {_id: req.params.id},
        {$set:req.body}
    )
    res.send(updateTask);
});


// search task from data base
app.get('/search/:key', async (req, res) => {
    let result = await Task.find(
        {
            "$or":[
                { "name": {$regex:req.params.key} },
                { "description": {$regex:req.params.key} },
                { "status": {$regex:req.params.key} },
                { "type": {$regex:req.params.key} }
            ]
        }
    );
    res.send(result);
});

app.listen(port);