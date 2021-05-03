let headers = new Headers()
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', 'http://localhost:5000');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS','PUT','DELETE');
medico=''
usermedico=''
var can=1;

fetch(`http://localhost:5000/getlogmedico`) //Buscando el usuario seleccionado
    .then(response => response.json())
    .then(data => {
   medico=data.nombre+" "+data.apellido;
   usermedico=data.user;

    })

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
        var state = new String(data[i].estado);
        state=state.toUpperCase();
        text2+= `
                <tr>
                <td>${data[i].id}</td>
                <td>${data[i].fecha}</td>
                <td>${data[i].hora}</td>
                <td>${data[i].motivo}</td>
                <td ><button class="btn btn-success" onclick="aceptar('${data[i].id}','${data[i].paciente}','${data[i].fecha}','${data[i].hora}','${data[i].motivo}')">Aceptar</button></td>
                `

           
        } 
        else{
        
        }
}
    text2+=`</tr>
            </tbody>
            </table>`
        document.getElementById("registro").innerHTML = text2;
});

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
    var state = new String(data[i].estado);
    state=state.toUpperCase();
    text2+= `
            <tr>
            <td>${data[i].id}</td>
            <td>${data[i].fecha}</td>
            <td>${data[i].hora}</td>
            <td>${data[i].motivo}</td>
            <td ><button class="btn btn-success" onclick="aceptar('${data[i].id}','${data[i].paciente}','${data[i].fecha}','${data[i].hora}','${data[i].motivo}')">Aceptar</button></td>
            `

       
    } 
    else{
    
    }
}
text2+=`</tr>
        </tbody>
        </table>`
    document.getElementById("registro").innerHTML = text2;
});

}

function aceptar(id,paciente,fecha,hora,motivo){
    
    
    let reque = `{
        "paciente":"${paciente}",
        "fecha":"${fecha}",
        "hora":"${hora}",
        "motivo":"${motivo}",
        "estado":"aceptada",
        "usermedico":"${usermedico}",
        "medico":"${medico}"
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
