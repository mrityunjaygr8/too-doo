var mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
    text: String
});

mongoose.model('todo', todoSchema);