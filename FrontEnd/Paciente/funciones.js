//Declaracion de Headers

let headers = new Headers()
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', 'http://localhost:5000');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS','PUT','DELETE');



   
    
    var nombre = document.getElementById("nombre");
    var apellido = document.getElementById("apellido");
    var fecha = document.getElementById("fecha");
    var sexo = document.getElementById("sexo");
    var usuario = document.getElementById("usuario");
    var pass = document.getElementById("password")
    var telefono = document.getElementById("telefono");
    let viejo_user='';

    fetch(`http://localhost:5000/getloguser`) //Buscando el usuario seleccionado
    .then(response => response.json())
    .then(data => {
   viejo_user=data.user;
   nombre.value=data.nombre;
   apellido.value=data.apellido;
   fecha.value=data.fecha;
   sexo.value=data.sexo;
   usuario.value=data.user;
   pass.value=data.password;
   telefono.value=data.telefono;
    })
    .then(
     
    )
    
function actualizar(){ 
     
        let reque = `{
        "nombre":"${nombre.value}",
        "apellido":"${apellido.value}",
        "fecha":"${fecha.value}",
        "sexo":"${sexo.value}",
        "user":"${usuario.value}",
        "password":"${pass.value}",
        "telefono":"${telefono.value}"
      }`
    
      fetch('http://localhost:5000/actualizacion/'+viejo_user, {
        method: 'PUT',
        headers,
        body: reque,
      })
      .then(response => response.json())
      .then(result => {
        console.log('Success:', result);
        alert("¡Perfil actualizado!")
        
      })
      .catch(error => {
        console.error('Error:', error);
      });
       }