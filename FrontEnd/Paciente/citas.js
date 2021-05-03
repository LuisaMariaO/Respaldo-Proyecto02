let headers = new Headers()
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', 'http://localhost:5000');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS','PUT','DELETE');
usuario='';
var can=1;

fetch(`http://localhost:5000/getloguser`) //Buscando el usuario seleccionado
    .then(response => response.json())
    .then(data => {
   usuario=data.user;

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
    <th scope="col">Médico</th>
    <th scope="col">Estado</th>
    </tr>
    </thead>
    <tbody>`
    
    fetch('http://localhost:5000/obtenercitas')
.then(response => response.json())
.then(data =>{
    var i;


    for(i=0;i<data.length;i++){

        if(data[i].paciente==usuario){
        var state = new String(data[i].estado);
        state=state.toUpperCase();
        text2+= `
                <tr>
                <td>${data[i].id}</td>
                <td>${data[i].fecha}</td>
                <td>${data[i].hora}</td>
                <td>${data[i].motivo}</td>
                <td>${data[i].medico}</td>
                `

           if(state=="PENDIENTE"){
            can=0;
               text2+= `
               <td style="color:#D6D01A">${state}</td>
               </tr>`
           }
           else if(state=="ACEPTADA"){ 
            can=0; 
            text2+= `
            <td style="color:#2D4ACD">${state}</td>
            </tr>`
           }  
           else if(state=="COMPLETADA"){
            text2+= `
            <td style="color:#3AC821">${state}</td>
            </tr>`
           }
           else{
            text2+= `
            <td style="color:#D54A25">${state}</td>
            </tr>`
           }   
             
        } 
        else{
        
        }
}
    text2+=`</tbody>
            </table>`
        document.getElementById("registro").innerHTML = text2;
});


function generar_cita(){
    if(can==0){
        alert("No es posible solicitar la cita")
    }
    else{
        var fecha = document.getElementById("fecha");
        var hora = document.getElementById("hora");
        var motivo= document.getElementById("motivo");
                 
        fetch('http://localhost:5000/nuevacita',
        {
            method:'POST',
            headers,
            body: `{
                    "paciente":"${usuario}",
                    "fecha":"${fecha.value}",
                    "hora":"${hora.value}",
                    "motivo":"${motivo.value}",
                    "estado":"pendiente",
                    "usermedico":"",
                    "medico":""
                    }`
        })
        .then(response => response.json())
        .then(
            result => {
                
                alert('Cita solicitada')
                window.location.href="../Paciente/inicio.html"
              }
        )
        .catch(
            error => {
                console.error('Error:', error);
               
                alert('Hubo un generando la solicitud')
              }
        )  
    }
  
    
        
        
     
}