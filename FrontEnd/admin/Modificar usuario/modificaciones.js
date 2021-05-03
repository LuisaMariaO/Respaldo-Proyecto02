let headers = new Headers()
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', 'http://localhost:5000');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS','PUT','DELETE');
var nombre = document.getElementById("vnombre");
var apellido = document.getElementById("vapellido");
var fecha = document.getElementById("vfecha");
var sexo = document.getElementById("vsexo");
var usuario = document.getElementById("vusuario");
var pass = document.getElementById("vpass")
var telefono = document.getElementById("vnumber");
    let viejo_user='';
    fetch(`http://localhost:5000/getpaciente`) //Buscando el usuario seleccionado
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
    /*
    nombre = document.getElementById("vnombre");
    apellido = document.getElementById("vapellido");
    fecha = document.getElementById("vfecha");
    sexo = document.getElementById("vsexo");
    lusuario = document.getElementById("vusuario");
    pass = document.getElementById("vpass")
    telefono = document.getElementById("vnumber");
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    */

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
    alert("Paciente actualizado")
    window.close()
  })
  .catch(error => {
    console.error('Error:', error);
  });
   }