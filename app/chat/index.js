module.exports = function (app) {
    var io = require('socket.io')(8888);
    var crudRouter = require('../routes/crudRouter');
    var Message = require('./Message')(app);

    app.use('/api/messages', crudRouter(Message, {noAuth: []}));

    io.on('connection', function (socket) {
        console.log('connection');
        socket.on('messageIn',function (msg, user) {
            console.log(msg);
            io.emit('messageOut', msg);
        })
    });

    io.on('disconnect', function (socket) {
        socket.on('leaveIn',user);
        io.emit('leaveOut',user+' leave chat');
    });


};