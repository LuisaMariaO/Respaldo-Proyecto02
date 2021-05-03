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
fetch(`http://localhost:5000/getenfermera`) //Buscando el usuario seleccionado
.then(response => response.json())
.then(data => {
   nombre.value=data.nombre;
   apellido.value=data.apellido;
   fecha.value=data.fecha;
   sexo.value=data.sexo;
   usuario.value=data.user;
   pass.value=data.password;
   telefono.value=data.telefono;
     
    
})
