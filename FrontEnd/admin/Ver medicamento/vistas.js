let headers = new Headers()
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', 'http://localhost:5000');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS','PUT','DELETE');


var nombre = document.getElementById("vnombre");
    var precio = document.getElementById("vprecio");
    var descripcion = document.getElementById("vdescripcion");
    var cantidad = document.getElementById("vcantidad");
    
fetch(`http://localhost:5000/getmedicamento`) //Buscando el usuario seleccionado
.then(response => response.json())
.then(data => {
   nombre.value=data.nombre;
   precio.value=data.precio;
   descripcion.value=data.descripcion;
   cantidad.value=data.cantidad;    
})
