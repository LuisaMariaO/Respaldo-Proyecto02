let headers = new Headers()
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', 'http://localhost:5000');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS','PUT','DELETE');
usuario='';
var can=1;



    document.getElementById("registro").innerHTML='';
    let text2=""
    text2 = `
    <table class="table" style="margin:10px">
    <thead>
    <tr>
    <th scope="col">Número de cita</th>
    <th scope="col">Fecha</th>
    <th scope="col">Hora</th>
    <th scope="col">Motivo</th>

    <th></th>
    </tr>
    </thead>
    <tbody>`
    
    fetch('http://localhost:5000/obtenercitas')
.then(response => response.json())
.then(data =>{
    var i;

    
    for(i=0;i<data.length;i++){
        if(data[i].estado=="pendiente"){
       
        text2+= `
                <tr>
                <td>${data[i].id}</td>
                <td>${data[i].fecha}</td>
                <td>${data[i].hora}</td>
                <td>${data[i].motivo}</td>
         
                `

                text2+=`</td>
                <td ><button class="btn btn-success" onclick="aceptar('${data[i].id}','${data[i].paciente}','${data[i].fecha}','${data[i].hora}','${data[i].motivo}')">Aceptar</button></td>
                <td><button class="btn btn-danger" onclick="rechazar('${data[i].id}','${data[i].paciente}','${data[i].fecha}','${data[i].hora}','${data[i].motivo}')">Rechazar</button></td>
               </tr>`
                

        }
       
}
    text2+=`</tbody>
            </table>`
        document.getElementById("registro").innerHTML = text2;
});

//Médicos
document.getElementById("medicos").innerHTML='';
    let textm=""
    textm = `
    <select id="opciones" name="lineas">
    `
    
    fetch('http://localhost:5000/obtenermedicos')
.then(response => response.json())
.then(data =>{
    var i;
    var valor;
    
    for(i=0;i<data.length;i++){
      valor=`${data[i].user}`
     
    
        textm+= `
                
                <option value="${data[i].user}"> ${data[i].nombre} ${data[i].apellido}</option>
                
               
                `

                
                

        
       
}
    textm+=`</selection>
            `
        document.getElementById("medicos").innerHTML = textm;
});


function aceptar(id,paciente,fecha,hora,motivo){
var seleccion = document.getElementById("opciones");
medico=seleccion.value;
var nombre=$('select[name="lineas"] option:selected').text();

let reque = `{
    "paciente":"${paciente}",
    "fecha":"${fecha}",
    "hora":"${hora}",
    "motivo":"${motivo}",
    "estado":"aceptada",
    "usermedico":"${medico}",
    "medico":"${nombre}"
  }`

  fetch('http://localhost:5000/actualizacita/'+id, {
    method: 'PUT',
    headers,
    body: reque,
  })
  .then(response => response.json())
  .then(result => {
    console.log('Success:', result);
    alert("Cita aceptada")
    actualizacita()
   
  })
  .catch(error => {
    console.error('Error:', error);
  });
   

  
        
        
     
}

function rechazar(id,paciente,fecha,hora,motivo){
    var seleccion = document.getElementById("opciones");
    medico=seleccion.value;
    var nombre=$('select[name="lineas"] option:selected').text();
    let reque = `{
        "paciente":"${paciente}",
        "fecha":"${fecha}",
        "hora":"${hora}",
        "motivo":"${motivo}",
        "estado":"rechazada",
        "usermedico":"${medico}",
        "medico":"${nombre}"
      }`
    
      fetch('http://localhost:5000/actualizacita/'+id, {
        method: 'PUT',
        headers,
        body: reque,
      })
      .then(response => response.json())
      .then(result => {
        console.log('Success:', result);
      
        actualizacita()
       
      })
      .catch(error => {
        console.error('Error:', error);
      });
       

}

function actualizacita(){
    document.getElementById("registro").innerHTML='';
    let text2=""
    text2 = `
    <table class="table" style="margin:10px">
    <thead>
    <tr>
    <th scope="col">Número de cita</th>
    <th scope="col">Fecha</th>
    <th scope="col">Hora</th>
    <th scope="col">Motivo</th>

    <th></th>
    </tr>
    </thead>
    <tbody>`
    
    fetch('http://localhost:5000/obtenercitas')
.then(response => response.json())
.then(data =>{
    var i;

    
    for(i=0;i<data.length;i++){
        if(data[i].estado=="pendiente"){
       
        text2+= `
                <tr>
                <td>${data[i].id}</td>
                <td>${data[i].fecha}</td>
                <td>${data[i].hora}</td>
                <td>${data[i].motivo}</td>
         
                `

                text2+=`</td>
                <td ><button class="btn btn-success" onclick="aceptar('${data[i].id}','${data[i].paciente}','${data[i].fecha}','${data[i].hora}','${data[i].motivo}')">Aceptar</button></td>
                <td><button class="btn btn-danger">Rechazar</button></td>
               </tr>`
                

        }
       
}
    text2+=`</tbody>
            </table>`
        document.getElementById("registro").innerHTML = text2;
});
}