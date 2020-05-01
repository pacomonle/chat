// ver mi IP- en cmd ipconfig

// conexion conmi IP con el puerto 6677 creado en index.js
// sin nos conectamos como localhost nos limitariamos solo a nuestro equipo local
var socket = io.connect('http://192.168.0.155:6677' ,{'forceNew':true});

// recibir mensaje bienvenida al conectarte
socket.on('messages', function(data){
    console.log('mensaje', data);
    render(data);
});

// pintar el array de objetos- messages en el html
function render(data){
    var html = data.map(function (message, index){
      // console.log('nickname', message.nickname, message.text);
        return (`
            <div class="message">
                <strong>${message.nickname}</strong> te dice:
                <p>${message.text}</p>
            </div>
            `);
    }).join(' ');
        
    var div_msgs = document.getElementById('messages');
    div_msgs.innerHTML = html;
    // tener el scroll de mensajes al final (actualizado)- el foco abajo
    div_msgs.scrollTop = div_msgs.scrollHeight;
      console.log("div_msgs", div_msgs);
}


function addMessage(e) {
    // objeto que enviamos al servidor para que socket lo guarde
    var message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    };
    console.log('message', message);
    
    // para mantener y no cambiar el nombre de usuario durante la sesion
    document.getElementById('nickname').style.display= 'none';

    // evento del cliente al servidor
    socket.emit('add-message', message);

    //para cortar la ejecucion de la funcion
    return false;
  

}