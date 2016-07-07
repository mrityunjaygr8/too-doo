require('../models/todo_model');
var mongoose = require('mongoose');
var Todo = mongoose.model('todo');

exports.list = function(req, res){
    Todo.find(function(err, todos){
        if(err)
            res.send(err);

        res.json(todos);
    });
};

exports.create = function(req, res){
    Todo.create({
        text: req.body.text,
        done: false
    }, function(err, todo){
        Todo.find().exec(function(err, todos){
            if(err)
                res.send(err);
            res.json(todos);
        });
    });
};

exports.delete = function(req, res){
    Todo.remove({
        _id: req.todo._id
    }, function(err, todo){
        Todo.find(function(err, todos){
            if(err)
                res.send(err);

            res.json(todos);
        });
    });
};

exports.todoById = function(req, res, next, id){
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.send({'message': 'invalid todo'});
    }

    Todo.findById(id).exec(function(err, todo){
        if(err) res.send(err);
        if(!todo) res.send({ 'message': 'todo not found'});

        req.todo = todo;
        next();
    });
};