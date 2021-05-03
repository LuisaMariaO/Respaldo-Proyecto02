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
    <th scope="col">Médico</th>
    </tr>
    </thead>
    <tbody>`
    
    fetch('http://localhost:5000/obtenercitas')
.then(response => response.json())
.then(data =>{
    var i;

    
    for(i=0;i<data.length;i++){
        if(data[i].estado=="aceptada"){
       
        text2+= `
                <tr>
                <td>${data[i].id}</td>
                <td>${data[i].fecha}</td>
                <td>${data[i].hora}</td>
                <td>${data[i].motivo}</td>
                <td>${data[i].medico}</td>
                `

                text2+=`
                
               </tr>`
                

        }
       
}
    text2+=`</tbody>
            </table>`
        document.getElementById("registro").innerHTML = text2;
});

