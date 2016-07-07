var controller = require('./app/controllers/todo_controller.js');

module.exports = function(app){
    app.route('/api/todos')
            .get(controller.list)
            .post(controller.create);

    app.route('/api/todos/:todoId')
            .delete(controller.delete);

    app.route('*')
            .get(function(req, res){
                res.sendFile('public/index.html', {root: __dirname});
            });

    app.param('todoId', controller.todoById);
};