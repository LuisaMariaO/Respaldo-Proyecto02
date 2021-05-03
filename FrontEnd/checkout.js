let headers = new Headers()
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', 'http://localhost:5000');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS','PUT','DELETE');

document.getElementById("detalle").innerHTML='';
let text2=""
text2 = `
<table class="table" style="margin:10px">
<thead>
<tr>
<th scope="col">#</th>
<th scope="col">Producto</th>
<th scope="col">Precio (Q)</th>
<th scope="col">Cantidad</th>
<th scope="col">Subtotal</th>
</tr>
</thead>
<tbody>`

fetch('http://localhost:5000/obtenerpedidos')
.then(response => response.json())
.then(data =>{
var i;
var subtotal=0;

for(i=0;i<data.length;i++){
 subtotal=subtotal+(data[i].precio*data[i].cantidad)
    text2+= `
            <tr>
            <td>${data[i].id}</td>
            <td>${data[i].producto}</td>
            <td>${data[i].precio}</td>
            <td><input type="number" value="${data[i].cantidad}" Style="width:50px"></td>
            <td>${subtotal}<td>
            `
       
            
           

            text2+=` 
            </td> 
           </tr>`
            

    
   
}
text2+=`</tbody>
        </table>`
    document.getElementById("detalle").innerHTML = text2;
});

function termina(){
    alert("Pedido enviado")
    window.location.href='../FrontEnd/Paciente/inicio.html'
}