var express = require("express"),
    app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(5000, function(){
	console.log('server node en 5000');
});

var router = express.Router();

router.get('/', function(req, res) {
	/*res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "false");*/
});
app.use('/', router);


io.on('connection', function (socket) {
  socket.emit('hola', { hola: 'world' });
  socket.on('add_new_project', function (data) {
    socket.broadcast.emit('add_new_project_notification', { project_owner: data.project_owner });
    socket.emit('requestOK', {redirect: data.redirect});
    
  });
  socket.on('add_new_piece', function (data) {
    socket.broadcast.emit('add_new_piece_notification', { piece_owner: data.piece_owner, assigend_user_id: data.assigend_user_id });
    socket.emit('requestOK', {redirect: data.redirect});
    
  });

  socket.on('add_new_comment', function (data) {
    socket.broadcast.emit('add_new_comment_notification', { project_owner: data.project_owner, assigned_user_id: data.assigned_user_id });
    //socket.emit('requestOK', {redirect: data.redirect});
    
  });

  socket.on('new_task_for_qa', function (data) {
    socket.broadcast.emit('new_task_for_qa_notification', { message: data.message });
    socket.emit('sendForm', {redirect: data.redirect});
    
  });
  socket.on('new_comment_history', function (data) {
    socket.broadcast.emit('new_comment_history_notification', { message: data.user , assigned_user_id: data.assigned_user_id, project_owner: data.project_owner});
    //socket.emit('requestOK', {redirect: data.redirect});
    
  });
   socket.on('task_done', function (data) {
    socket.broadcast.emit('task_done_notification', {project_owner: data.project_owner});
    //socket.emit('requestOK', {redirect: data.redirect});
    
  }); 

  socket.on('project_assigned', function (data) {
    socket.broadcast.emit('reload');
    //socket.emit('requestOK', {redirect: data.redirect});
    
  });

  //trucoooo
  socket.on('join', function(data){
    socket.emit('user_joined', {user_id: data.user_id, partida_id: data.partida_id});
    socket.broadcast.emit('user_joined_notification', {user_id: data.user_id, partida_id: data.partida_id});
  });
});