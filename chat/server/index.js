// cargar librerias
var express = require ('express');
// cargar la lbreria espress
var app= express();
// libreria- para la conexion y servidor http
var server= require('http').Server(app);
// variable io para cargar la libreria socket y el servidor
var io= require('socket.io')(server);


// cargar vista estatica- carpeta client
app.use(express.static('client'))


// crear ruta
app.get('/hola-mundo', function(req, res){
    res.status(200).send('hola mundo desde una ruta');
});

// socket.io - conexion abierta con el servidor mientras este corriento el socket

// conexion al socket.io

// array para almacenar los mensajes en objetos JSON
var messages = [{
    id: 1,
    text: 'Bienvenido al chat privado de socket.io y nodeJS...',
    nickname: 'Bot - NolitogamerXD'
}];

    // para lanzar eventos

    //evento para la conexion de clientes
io.on('connection', function (socket) {
    console.log('El cliente con IP: '+socket.handshake.address+' se ha concetado...');

   // evento enviar mensajes al cliente
   socket.emit('messages', messages);

   // recibir el evento addMessage y añadir al array
   socket.on('add-message', function(data){
        messages.push(data);

    // evento enviar mensajes a todos los clientes conectados
     io.sockets.emit('messages', messages);

    });
     
   console.log('messages', messages);

});



// crear servidor con express: 1º parametro - elpuerto
server.listen(6677, function(){
    console.log("el servidor esta funcionando en : http://localhost:6677");
    
});
