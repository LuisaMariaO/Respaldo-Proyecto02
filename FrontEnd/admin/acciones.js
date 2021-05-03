

function convertirdata(paciente){
    
    var data ={
      "Nombre":paciente.nombre,
      "Apellido":paciente.apellido,
      "Fecha de nacimiento":paciente.fecha,
      "Sexo":paciente.sexo,
      "Usuario":paciente.user,
      "Contraseña":paciente.password,
      "Teléfono":paciente.telefono
    }
  
    return data
  
  }
  
  function pdfpacientes(){
    
    fetch('http://localhost:5000/obtenerusuarios')
    .then(response => response.json())
    .then(data=>{
      //Declarando los headers
      let headers = createHeaders([
        "Nombre",
        "Apellido",
        "Fecha de nacimiento",
        "Sexo",
        "Usuario",
        "Contraseña",
        "Teléfono"
      ]);
      // Insertando los datos
     
      let datos=[]
      for(let i =0;i<data.length;i++){
        datos.push(Object.assign({},convertirdata(data[i])))
      }
      console.log(datos)
      var contentJsPdf = {
        headers,
        datos
    };
      var doc = new jsPDF( 'l', 'mm', [355, 355]);
         doc.setFont("arial", "bold"); 
      doc.table(5, 5, datos, headers, { autoSize: false});
      
      doc.save("Reporte de pacientes.pdf")
    })
  }

  //PDF de doctores
  function convertirdatadoctor(medico){
    
    var data ={
      "Nombre":medico.nombre,
      "Apellido":medico.apellido,
      "Fecha de nacimiento":medico.fecha,
      "Sexo":medico.sexo,
      "Usuario":medico.user,
      "Contraseña":medico.password,
      "Especialidad":medico.especialidad,
      "Teléfono":medico.telefono
    }
  
    return data
  
  }
  
  function pdfdoctores(){
    
    fetch('http://localhost:5000/obtenermedicos')
    .then(response => response.json())
    .then(data=>{
      //Declarando los headers
      let headers = createHeaders([
        "Nombre",
        "Apellido",
        "Fecha de nacimiento",
        "Sexo",
        "Usuario",
        "Contraseña",
        "Especialidad",
        "Teléfono"
      ]);
      // Insertando los datos
    
      let datos=[]
      for(let i =0;i<data.length;i++){
        datos.push(Object.assign({},convertirdatadoctor(data[i])))
      }
      alert(datos.values)
      var contentJsPdf = {
        headers,
        datos
    };
      var doc = new jsPDF( 'l', 'mm',[400,400]);
         doc.setFont("arial", "bold"); 
      doc.table(1,1,datos,headers, { autoSize: false});
      
      doc.save("Reporte de doctores.pdf")
    })
  }

//PDF de enfermeras
function convertirdata(paciente){
    
    var data ={
      "Nombre":paciente.nombre,
      "Apellido":paciente.apellido,
      "Fecha de nacimiento":paciente.fecha,
      "Sexo":paciente.sexo,
      "Usuario":paciente.user,
      "Contraseña":paciente.password,
      "Teléfono":paciente.telefono
    }
  
    return data
  
  }
  
  function pdfenfermeras(){
    
    fetch('http://localhost:5000/obtenerenfermeras')
    .then(response => response.json())
    .then(data=>{
      //Declarando los headers
      let headers = createHeaders([
        "Nombre",
        "Apellido",
        "Fecha de nacimiento",
        "Sexo",
        "Usuario",
        "Contraseña",
        "Teléfono"
      ]);
      // Insertando los datos
     
      let datos=[]
      for(let i =0;i<data.length;i++){
        datos.push(Object.assign({},convertirdata(data[i])))
      }
      console.log(datos)
      var contentJsPdf = {
        headers,
        datos
    };
      var doc = new jsPDF( 'l', 'mm', [355, 355]);
         doc.setFont("arial", "bold"); 
      doc.table(5, 5, datos, headers, { autoSize: false});
      
      doc.save("Reporte de enfermeras.pdf")
    })
  }
  //PDF de medicamentos
  function convertirdatamedicamento(medicamento){
    
    var data ={
      "Nombre":medicamento.nombre,
      "Precio (Q)":medicamento.precio,
      "Descripción":medicamento.descripcion,
      "Cantidad":medicamento.cantidad
    }
  
    return data
  
  }
  function pdfmedicamentos(){
    
    fetch('http://localhost:5000/obtenermedicamentos')
    .then(response => response.json())
    .then(data=>{
      //Declarando los headers
      let headers = createHeaders([
        "Nombre",
        "Precio (Q)",
        "Descripción",
        "Cantidad"
      ]);
      // Insertando los datos
     
      let datos=[]
      for(let i =0;i<data.length;i++){
        datos.push(Object.assign({},convertirdatamedicamento(data[i])))
      }
      console.log(datos)
      var contentJsPdf = {
        headers,
        datos
    };
      var doc = new jsPDF( 'l', 'mm', [208, 208]);
         doc.setFont("arial", "bold"); 
      doc.table(5, 5, datos, headers, { autoSize: false});
      
      doc.save("Reporte de medicamentos.pdf")
    })
  }
 


 
 
//Declaracion de Headers

let headers = new Headers()
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Access-Control-Allow-Origin', 'http://localhost:5000');
headers.append('Access-Control-Allow-Credentials', 'true');
headers.append('GET', 'POST', 'OPTIONS','PUT','DELETE');

function actualizarpacientes(){
document.getElementById("tablausers").innerHTML='';
let text=""
text = `<table class="table" style="margin=10px">
<thead>
<tr>
<th scope="col">#</th>
<th scope="col">Nombre</th>
<th scope="col">Apellido</th>
<th scope="col">Usuario</th>
<th scope="col">Contraseña</th>
<th scope="col">Opciones</th>
</tr>
</thead>
<tbody>`

fetch('http://localhost:5000/obtenerusuarios')
.then(response => response.json())
.then(data =>{
    var i;
    var cuentap=0;
    
    for(i=0;i<data.length;i++){
        cuentap++;
        if(data[i].user!="admin"){
        text+= `
                <tr>
                <td>${i}</td>
                <td>${data[i].nombre}</td>
                <td>${data[i].apellido}</td>
                <td>${data[i].user}</td>
                <td>${data[i].password}</td> 
                <td> <button class="ver bg-primary"><i class="uil-eye iboton" onclick="verusuario('${data[i].user}')"></i></button> 
                <button class="ver bg-success"><i class="uil-pen iboton" onclick="modificarusuario('${data[i].user}')"></i></button>
                <button class="ver bg-danger"><i class="uil-trash iboton" onclick="eliminarusuario('${data[i].user}')"></i></button>
                </td>
                </tr>
                `
    }
}
    text+=`</tbody>
            </table>`
    document.getElementById("tablausers").innerHTML = text;
});
}

function actualizarmedicos(){
document.getElementById("tablamedicos").innerHTML='';
let text2=""
text2 = `
<table class="table" style="margin:10px">
<thead>
<tr>
<th scope="col">#</th>
<th scope="col">Nombre</th>
<th scope="col">Apellido</th>
<th scope="col">Especialidad</th>
<th scope="col"><span class="espacios"> </span>Opciones</th>
</tr>
</thead>
<tbody>`

fetch('http://localhost:5000/obtenermedicos')
.then(response => response.json())
.then(data =>{
    var i;

    
    for(i=0;i<data.length;i++){
        text2+= `
                <tr>
                <td>${i+1}</td>
                <td>${data[i].nombre}</td>
                <td>${data[i].apellido}</td>
                <td>${data[i].especialidad}</td>
                <td> <button class="ver bg-primary"><i class="uil-eye iboton" onclick="vermedico('${data[i].user}')"></i></button> 
                     <button class="ver bg-success"><i class="uil-pen iboton" onclick="modificarmedico('${data[i].user}')"></i></button>
                    <button class="ver bg-danger"><i class="uil-trash iboton" onclick="eliminarmedico('${data[i].user}')"></i></button>
                    </td>
                </tr>
                `
    
}
    text2+=`</tbody>
            </table>`
    document.getElementById("tablamedicos").innerHTML = text2;
});
}
function actualizarenfermeras(){
    document.getElementById("tablaenfermeras").innerHTML='';
    let text3=""
    text3 = `<table class="table" style="margin=10px">
    <thead>
    <tr>
    <th scope="col">#</th>
    <th scope="col">Nombre</th>
    <th scope="col">Apellido</th>
    <th scope="col">Usuario</th>
    <th scope="col">Contraseña</th>
    <th scope="col">Opciones</th>
    </tr>
    </thead>
    <tbody>`
    
    fetch('http://localhost:5000/obtenerenfermeras')
    .then(response => response.json())
    .then(data =>{
        var i;
    
        
        for(i=0;i<data.length;i++){
      
            text3+= `
                    <tr>
                    <td>${i+1}</td>
                    <td>${data[i].nombre}</td>
                    <td>${data[i].apellido}</td>
                    <td>${data[i].user}</td>
                    <td>${data[i].password}</td>
                    <td> <button class="ver bg-primary" onclick="verenfermera('${data[i].user}')"><i class="uil-eye iboton"></i></button> 
                    <button class="ver bg-success"  onclick="modificarenfermera('${data[i].user}')"><i class="uil-pen iboton"></i></button>
                    <button class="ver bg-danger" onclick="eliminarenfermera('${data[i].user}')"><i class="uil-trash iboton"></i></button>
                    </td> 
                    </tr>
                    `
        
    }
        text3+=`</tbody>
                </table>`
        document.getElementById("tablaenfermeras").innerHTML = text3;
    });   
}

function actualizarmedicamentos(){
document.getElementById("tablamedicamentos").innerHTML = '';
let text4=""
text4 = `<table class="table" style="margin=10px">
<thead>
<tr>
<th scope="col">#</th>
<th scope="col">Nombre</th>
<th scope="col">Precio (Q)</th>
<th scope="col">Descripción</th>
<th scope="col">Cantidad</th>
<th scoope="col">Opciones</th>
</tr>
</thead>
<tbody>`

fetch('http://localhost:5000/obtenermedicamentos')
.then(response => response.json())
.then(data =>{
    var i;

    
    for(i=0;i<data.length;i++){
  
        text4+= `
                <tr>
                <td>${i+1}</td>
                <td>${data[i].nombre}</td>
                <td>${data[i].precio}</td>
                <td>${data[i].descripcion}</td>
                <td>${data[i].cantidad}</td> 
                <td> <button class="ver bg-primary" onclick="vermedicamento('${data[i].nombre}')"><i class="uil-eye iboton"></i></button> 
                <button class="ver bg-success" onclick="modificarmedicamento('${data[i].nombre}')"><i class="uil-pen iboton"></i></button>
                <button class="ver bg-danger" onclick="eliminarmedicamento('${data[i].nombre}')"><i class="uil-trash iboton"></i></button>
                </td>
                </tr>
                `
    
}
    text4+=`</tbody>
            </table>`
    document.getElementById("tablamedicamentos").innerHTML = text4;
});
}
//Carga de Pacientes
let text=""
text = `
<table class="table" style="margin:10px">
<thead>
<tr>
<th scope="col">#</th>
<th scope="col">Nombre</th>
<th scope="col">Apellido</th>
<th scope="col">Usuario</th>
<th scope="col">Contraseña </th>
<th scope="col"><span class="espacios"> </span>Opciones</th>
</tr>
</thead>
<tbody>`

fetch('http://localhost:5000/obtenerusuarios')
.then(response => response.json())
.then(data =>{
    var i;
    var cuentap=0;
    
    for(i=0;i<data.length;i++){
        cuentap++;
        if(data[i].user!="admin"){
        text+= `
                <tr>
                <td>${i}</td>
                <td>${data[i].nombre}</td>
                <td>${data[i].apellido}</td>
                <td>${data[i].user}</td>
                <td>${data[i].password}</td> 
                <td> <button class="ver bg-primary"><i class="uil-eye iboton" onclick="verusuario('${data[i].user}')"></i></button> 
                <button class="ver bg-success"><i class="uil-pen iboton" onclick="modificarusuario('${data[i].user}')"></i></button> 
                <button class="ver bg-danger"><i class="uil-trash iboton" onclick="eliminarusuario('${data[i].user}')"></i></button>
                </td>
                </tr>
                `
    }
}
    text+=`</tbody>
            </table>`
    document.getElementById("tablausers").innerHTML = text;
});

//Carga de Médicos
let text2=""
text2 = `
<table class="table" style="margin:10px">
<thead>
<tr>
<th scope="col">#</th>
<th scope="col">Nombre</th>
<th scope="col">Apellido</th>
<th scope="col">Especialidad</th>
<th scope="col"><span class="espacios"> </span>Opciones</th>
</tr>
</thead>
<tbody>`

fetch('http://localhost:5000/obtenermedicos')
.then(response => response.json())
.then(data =>{
    var i;

    
    for(i=0;i<data.length;i++){
        text2+= `
                <tr>
                <td>${i+1}</td>
                <td>${data[i].nombre}</td>
                <td>${data[i].apellido}</td>
                <td>${data[i].especialidad}</td>
                <td> <button class="ver bg-primary" onclick="vermedico('${data[i].user}')"><i class="uil-eye iboton"></i></button> 
                    <button class="ver bg-success" onclick="modificarmedico('${data[i].user}')"><i class="uil-pen iboton"></i></button>
                    <button class="ver bg-danger" onclick="eliminarmedico('${data[i].user}')"><i class="uil-trash iboton"></i></button>
                    </td>
                </tr>
                `
    
}
    text2+=`</tbody>
            </table>`
    document.getElementById("tablamedicos").innerHTML = text2;
});
//Carga de Enfermeras
let text3=""
text3 = `<table class="table" style="margin=10px">
<thead>
<tr>
<th scope="col">#</th>
<th scope="col">Nombre</th>
<th scope="col">Apellido</th>
<th scope="col">Usuario</th>
<th scope="col">Contraseña</th>
<th scope="col">Opciones</th>
</tr>
</thead>
<tbody>`

fetch('http://localhost:5000/obtenerenfermeras')
.then(response => response.json())
.then(data =>{
    var i;

    
    for(i=0;i<data.length;i++){
  
        text3+= `
                <tr>
                <td>${i+1}</td>
                <td>${data[i].nombre}</td>
                <td>${data[i].apellido}</td>
                <td>${data[i].user}</td>
                <td>${data[i].password}</td>
                <td> <button class="ver bg-primary" onclick="verenfermera('${data[i].user}')"><i class="uil-eye iboton"></i></button> 
                <button class="ver bg-success" onclick="modificarenfermera('${data[i].user}')"><i class="uil-pen iboton"></i></button>
                <button class="ver bg-danger" onclick="eliminarenfermera('${data[i].user}')"><i class="uil-trash iboton"></i></button>
                </td> 
                </tr>
                `
    
}
    text3+=`</tbody>
            </table>`
    document.getElementById("tablaenfermeras").innerHTML = text3;
});
//Carga de Medicamentos
let text4=""
text4 = `<table class="table" style="margin=10px">
<thead>
<tr>
<th scope="col">#</th>
<th scope="col">Nombre</th>
<th scope="col">Precio (Q)</th>
<th scope="col">Descripción</th>
<th scope="col">Cantidad</th>
<th scoope="col">Opciones</th>
</tr>
</thead>
<tbody>`

fetch('http://localhost:5000/obtenermedicamentos')
.then(response => response.json())
.then(data =>{
    var i;

    
    for(i=0;i<data.length;i++){
  
        text4+= `
                <tr>
                <td>${i+1}</td>
                <td>${data[i].nombre}</td>
                <td>${data[i].precio}</td>
                <td>${data[i].descripcion}</td>
                <td>${data[i].cantidad}</td> 
                <td> <button class="ver bg-primary" onclick="vermedicamento('${data[i].nombre}')"><i class="uil-eye iboton"></i></button> 
                <button class="ver bg-success" onclick="modificarmedicamento('${data[i].nombre}')"><i class="uil-pen iboton"></i></button>
                <button class="ver bg-danger" onclick="eliminarmedicamento('${data[i].nombre}')"><i class="uil-trash iboton"></i></button>
                </td>
                </tr>
                `
    
}
    text4+=`</tbody>
            </table>`
    document.getElementById("tablamedicamentos").innerHTML = text4;
});

function verusuario(usuario){
  //let user = usuario
  fetch(`http://localhost:5000/setpaciente/${usuario}`, {
    method: 'POST',
    headers,
    body: `{
        "user":"${usuario}"
        
      }`,
  })
  .then(response => response.json())
  .then(result => {
    console.log('Success:', result);
    window.open('../admin/Ver usuario/vista.html','winpop','width=750,height=1000')
   
  })
  .then(
    actualizarpacientes()
  )
  .catch(error => {
    console.error('Error:', error);
  });

    
   
        
}

function modificarusuario(usuario){

fetch(`http://localhost:5000/setpaciente/${usuario}`, {
  method: 'POST',
  headers,
  body: `{
      "user":"${usuario}"
      
    }`,
})
.then(response => response.json())
.then(result => {
  console.log('Success:', result);
  window.open('../admin/Modificar usuario/modifica.html','winpop','width=750,height=1000')

})
.catch(error => {
  console.error('Error:', error);
});

}
function eliminarusuario(usuario){
 
  fetch('http://localhost:5000/eliminarpaciente/'+usuario,{
      method:'DELETE'
  })
  .then(res => res.text())
  .then(res=> {
    
      alert("Paciente eliminado")
      actualizarpacientes()
  })
}
//Acciones para los botones de la tabla de médicos
function vermedico(usuario){
  //let user = usuario
  fetch(`http://localhost:5000/setmedico/${usuario}`, {
    method: 'POST',
    headers,
    body: `{
        "user":"${usuario}"
        
      }`,
  })
  .then(response => response.json())
  .then(result => {
    console.log('Success:', result);
    window.open('../admin/Ver medico/vista.html','winpop','width=750,height=1000')
   
  })
  .then(
    actualizarpacientes()
  )
  .catch(error => {
    console.error('Error:', error);
  });

    
   
        
}

function modificarmedico(usuario){

fetch(`http://localhost:5000/setmedico/${usuario}`, {
  method: 'POST',
  headers,
  body: `{
      "user":"${usuario}"
      
    }`,
})
.then(response => response.json())
.then(result => {
  console.log('Success:', result);
  window.open('../admin/Modificar medico/modifica.html','winpop','width=750,height=1000')

})
.catch(error => {
  console.error('Error:', error);
});

}
function eliminarmedico(usuario){
 
  fetch('http://localhost:5000/eliminarmedico/'+usuario,{
      method:'DELETE'
  })
  .then(res => res.text())
  .then(res=> {
    
      alert("Médico eliminado")
      actualizarmedicos()
  })
}

//Acciones para los botones de la tabla de enfermeras
function verenfermera(usuario){
  fetch(`http://localhost:5000/setenfermera/${usuario}`, {
    method: 'POST',
    headers,
    body: `{
        "user":"${usuario}"
        
      }`,
  })
  .then(response => response.json())
  .then(result => {
    console.log('Success:', result);
    window.open('../admin/Ver enfermera/vista.html','winpop','width=750,height=1000')
   
  })
  .then(
   
  )
  .catch(error => {
    console.error('Error:', error);
  });

    
   
        
}

function modificarenfermera(usuario){

fetch(`http://localhost:5000/setenfermera/${usuario}`, {
  method: 'POST',
  headers,
  body: `{
      "user":"${usuario}"
      
    }`,
})
.then(response => response.json())
.then(result => {
  console.log('Success:', result);
  window.open('../admin/Modificar enfermera/modifica.html','winpop','width=750,height=1000')

})
.catch(error => {
  console.error('Error:', error);
});

}

function eliminarenfermera(usuario){
 
  fetch('http://localhost:5000/eliminarenfermera/'+usuario,{
      method:'DELETE'
  })
  .then(res => res.text())
  .then(res=> {
    
      alert("Enfermera eliminada")
      actualizarenfermeras()
  })
}

//Acciones para los botones de la tabla de medicamentos
function vermedicamento(nombre){
  fetch(`http://localhost:5000/setmedicamento/${nombre}`, {
    method: 'POST',
    headers,
    body: `{
        "nombre":"${nombre}"
        
      }`,
  })
  .then(response => response.json())
  .then(result => {
    console.log('Success:', result);
    window.open('../admin/Ver medicamento/vista.html','winpop','width=750,height=600')
   
  })
  .then(
   
  )
  .catch(error => {
    console.error('Error:', error);
  });

    
   
        
}

function modificarmedicamento(nombre){

fetch(`http://localhost:5000/setmedicamento/${nombre}`, {
  method: 'POST',
  headers,
  body: `{
      "nombre":"${nombre}"
      
    }`,
})
.then(response => response.json())
.then(result => {
  console.log('Success:', result);
  window.open('../admin/Modificar medicamento/modifica.html','winpop','width=750,height=600')

})
.catch(error => {
  console.error('Error:', error);
});

}

function eliminarmedicamento(nombre){
 
  fetch('http://localhost:5000/eliminarmedicamento/'+nombre,{
      method:'DELETE'
  })
  .then(res => res.text())
  .then(res=> {
    
      alert("Medicamento eliminado")
      actualizarmedicamentos()
  })
}

function cargar(){
    let file = document.getElementById("carga").files[0];
    var arachivo = document.getElementById("carga");
    console.log(file)
    if (file) {
        let reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            let cuerpo = {
                data:evt.target.result
            }
            
            console.log(JSON.stringify(cuerpo))
            fetch('http://localhost:5000/cargapacientes', {
            method: 'POST',
            headers,
            body: JSON.stringify(cuerpo),
            })
            .then(response => response.json())
            .then(result => {
                console.log('Success:', result);
                arachivo.value=''
                alert("¡Pacientes cargados con éxito!")
                actualizarpacientes()
            })
            .catch(error => {
                console.error('Error:', error);
                arachivo.value=''
                actualizarpacientes()
               
                
            });

        }
        reader.onerror = function (evt) {
            
        }
    }
}
function cargarmedicos(){
    let file = document.getElementById("cargamed").files[0];
    var arachivo = document.getElementById("cargamed");
    console.log(file)
    if (file) {
        let reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            let cuerpo = {
                data:evt.target.result
            }
            
            console.log(JSON.stringify(cuerpo))
            fetch('http://localhost:5000/cargamedicos', {
            method: 'POST',
            headers,
            body: JSON.stringify(cuerpo),
            })
            .then(response => response.json())
            .then(result => {
                console.log('Success:', result);
                alert("¡Médicos cargados con éxito!")
                arachivo.value=''
                
                actualizarmedicos()
            })
            .catch(error => {
                console.error('Error:', error);
                arachivo.value=''
                actualizarmedicos()
               
                
            });

        }
        reader.onerror = function (evt) {
            
        }
    }  
}
function cargarenfermeras(){
    let file = document.getElementById("cargaenf").files[0];
    var arachivo = document.getElementById("cargaenf");
    console.log(file)
    if (file) {
        let reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            let cuerpo = {
                data:evt.target.result
            }
            
            console.log(JSON.stringify(cuerpo))
            fetch('http://localhost:5000/cargaenfermeras', {
            method: 'POST',
            headers,
            body: JSON.stringify(cuerpo),
            })
            .then(response => response.json())
            .then(result => {
                console.log('Success:', result);
                arachivo.value=''
                alert("¡Enfermeras cargados con éxito!")
                actualizarenfermeras()
            })
            .catch(error => {
                console.error('Error:', error);
                arachivo.value=''
                actualizarenfermeras()
               
                
            });

        }
        reader.onerror = function (evt) {
            
        }
    }  
}
function cargarmedicamentos(){
    let file = document.getElementById("cargamedi").files[0];
    var arachivo = document.getElementById("cargamedi");
    console.log(file)
    if (file) {
        let reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            let cuerpo = {
                data:evt.target.result
            }
            
            console.log(JSON.stringify(cuerpo))
            fetch('http://localhost:5000/cargamedicamentos', {
            method: 'POST',
            headers,
            body: JSON.stringify(cuerpo),
            })
            .then(response => response.json())
            .then(result => {
                console.log('Success:', result);
                arachivo.value=''
                actualizarmedicamentos()
                alert("¡Medicamentos cargados con éxito!")
            })
            .catch(error => {
                console.error('Error:', error);
                arachivo.value=''
                actualizarmedicamentos()
              
               
                
            });

        }
        reader.onerror = function (evt) {
            
        }
    }  
}
//Generación de PDFs
function createHeaders(keys) {
    var result = [];
    for (var i = 0; i < keys.length; i += 1) {
      result.push({
        id: keys[i],
        name: keys[i],
        prompt: keys[i],
        width: 65,
        align: "center",
        padding: 0
      });
    }
    return result;
  }
  
  
    
