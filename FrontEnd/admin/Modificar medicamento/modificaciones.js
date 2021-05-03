let headers = new Headers()
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', 'http://localhost:5000');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS','PUT','DELETE');
    var id='';
    var nombre = document.getElementById("vnombre");
    var precio = document.getElementById("vprecio");
    var descripcion = document.getElementById("vdescripcion");
    var cantidad = document.getElementById("vcantidad");
    let viejo_user='';
    fetch(`http://localhost:5000/getmedicamento`) //Buscando el usuario seleccionado
    .then(response => response.json())
    .then(data => {
   id=data.id;  
   viejo_nombre=data.nombre;
   nombre.value=data.nombre;
   precio.value=data.precio;
   descripcion.value=data.descripcion;
   cantidad.value=data.cantidad;    
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
    "id":"${id.value}",  
    "nombre":"${nombre.value}",
    "precio":"${precio.value}",
    "descripcion":"${descripcion.value}",
    "cantidad":"${cantidad.value}"
  }`

  fetch('http://localhost:5000/actualizamedicamento/'+viejo_nombre, {
    method: 'PUT',
    headers,
    body: reque,
  })
  .then(response => response.json())
  .then(result => {
    console.log('Success:', result);
    alert("Medicamento actualizado")
    window.close()
  })
  .catch(error => {
    console.error('Error:', error);
  });
   }