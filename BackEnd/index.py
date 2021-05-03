#Importaciones de Flask

from flask import Flask,request,jsonify
from flask_cors import CORS
from Gestor import Gestor

#Crear la app

app = Flask(__name__)
app.config["DEBUG"] = True

CORS(app)

gestor = Gestor()

# EndPoints
@app.route('/',methods=['GET'])
def home():
    return 'SERVER IS WORKING!!'
#Obtiene pacientes
@app.route('/obtenerusuarios')
def obtenerusuarios():
    return gestor.obtener_usuarios()
#Obtiene medicos
@app.route('/obtenermedicos')
def obtenermedicos():
    return gestor.obtener_medicos()
#Obtiene enfermeras
@app.route('/obtenerenfermeras')
def obtenerenfermeras():
    return gestor.obtener_enfermeras()
#Obtiene medicamentos
@app.route('/obtenermedicamentos')
def obtenermedicamentos():
    return gestor.obtener_medicamentos()
@app.route('/obtenercitas')
def obtenercitas():
    return gestor.obtener_citas()
@app.route('/obtenerpedidos')
def obtenerpedidos():
    return gestor.obtener_pedidos()  



#Login de pacientes
@app.route('/login/<user>/<password>')
def login(user,password):
    return gestor.iniciar_sesion(user,password)
#Login de medicos
@app.route('/loginmedico/<user>/<password>')
def loginmedico(user,password):
    return gestor.iniciar_sesionmedico(user,password)
#Login de enfermeras
@app.route('/loginenfermera/<user>/<password>')
def loginenfermera(user,password):
    return gestor.iniciar_sesionenfermera(user,password)
#Busca un paciente
@app.route('/pacientes/<user>')
def buscapacientes(user):
    return gestor.buscar_pacientes(user)       

@app.route('/registro',methods=['POST'])
def registrar():
    dato = request.json
    gestor.registrar_usuario(dato['nombre'],dato['apellido'],dato['fecha'],dato['sexo'],dato['user'],dato['password'],dato['telefono'])    
    return '{"data":"Creado"}'
#Creación de citas
@app.route('/nuevacita',methods=['POST'])
def registrarcita():
    dato = request.json
    gestor.registrar_cita(dato['paciente'],dato['fecha'],dato['hora'],dato['motivo'],dato['estado'],dato['usermedico'],dato['medico'])    
    return '{"data":"Creado"}'

@app.route('/actualizacita/<id>',methods=['PUT'])
def actualizarcita(id):
    dato = request.json
    print(dato)
    if gestor.actualizar_cita(id,dato['paciente'],dato['fecha'],dato['hora'],dato['motivo'],dato['estado'],dato['usermedico'],dato['medico']):
        return '{"data":"Actualizado"}'
    return '{"data":"Error"}'  

#Gestion de pedidos
@app.route('/nuevopedido',methods=['POST'])
def registrarpedido():
    dato = request.json
    gestor.registrar_pedido(dato['usuario'],dato['producto'],dato['precio'],dato['cantidad'])    
    return '{"data":"Creado"}'

@app.route('/actualizapedido/<id>',methods=['PUT'])
def actualizarpedido(id):
    dato = request.json
    print(dato)
    if gestor.actualizar_pedido(id,dato['usuario'],dato['producto'],dato['precio'],dato['cantidad']):
        return '{"data":"Actualizado"}'
    return '{"data":"Error"}'  

@app.route('/cargapacientes',methods=['POST'])
def cargap():
    
    dato = request.json
    gestor.cargamasiva(dato['data'])
    return '{"data":"Cargados"}'

@app.route('/cargamedicos',methods=['POST'])
def cargamed():
    dato = request.json
    gestor.cargamasivamed(dato['data'])
    return '{"data":"Cargados"}'   

@app.route('/cargaenfermeras',methods=['POST'])
def cargaenf():
    dato = request.json
    gestor.cargamasivaenf(dato['data'])
    return '{"data":"Cargados"}'  

@app.route('/cargamedicamentos',methods=['POST'])
def cargamedi():
    dato = request.json
    gestor.cargamasivamedi(dato['data'])
    return '{"data":"Cargados"}'        
#Vista, modificación y eliminación de usuario
@app.route('/setpaciente/<user>',methods=['POST'])
def setpaciente(user):
    gestor.setPaciente(user)
    return '{"data":"Entregado"}' 

@app.route('/getpaciente')
def getpaciente():
    return gestor.getPaciente()
@app.route('/actualizacion/<user>',methods=['PUT'])
def actualizarusuario(user):
    dato = request.json
    if gestor.actualizar_usuario(user,dato['nombre'],dato['apellido'],dato['fecha'],dato['sexo'],dato['user'],dato['password'],dato['telefono']):
        return '{"data":"Actualizado"}'
    return '{"data":"Error"}'  
             
@app.route('/eliminarpaciente/<user>',methods=['DELETE'])
def eliminar_usuario(user):
    if(gestor.eliminar_usuario(user)):
        return '{"data":"Eliminado"}'
    return '{"data":"Error"}'

#Vista, modificación y eliminación de médicos
@app.route('/setmedico/<user>',methods=['POST'])
def setmedico(user):
    gestor.setMedico(user)
    return '{"data":"Entregado"}' 

@app.route('/getmedico')
def getmedico():
    return gestor.getMedico()
@app.route('/actualizamedico/<user>',methods=['PUT'])
def actualizamedico(user):
    dato = request.json
    if gestor.actualizar_medico(user,dato['nombre'],dato['apellido'],dato['fecha'],dato['sexo'],dato['user'],dato['password'],dato['especialidad'],dato['telefono']):
        return '{"data":"Actualizado"}'
    return '{"data":"Error"}'  
             
@app.route('/eliminarmedico/<user>',methods=['DELETE'])
def eliminar_medico(user):
    if(gestor.eliminar_medico(user)):
        return '{"data":"Eliminado"}'
    return '{"data":"Error"}'

#Vista, modificación y eliminación de enfermeras
@app.route('/setenfermera/<user>',methods=['POST'])
def setenfermera(user):
    gestor.setEnfermera(user)
    return '{"data":"Entregado"}' 

@app.route('/getenfermera')
def getenfermera():
    return gestor.getEnfermera()
@app.route('/actualizaenfermera/<user>',methods=['PUT'])
def actualizaenfermera(user):
    dato = request.json
    if gestor.actualizar_enfermera(user,dato['nombre'],dato['apellido'],dato['fecha'],dato['sexo'],dato['user'],dato['password'],dato['telefono']):
        return '{"data":"Actualizado"}'
    return '{"data":"Error"}'  
             
@app.route('/eliminarenfermera/<user>',methods=['DELETE'])
def eliminar_enfermera(user):
    if(gestor.eliminar_enfermera(user)):
        return '{"data":"Eliminado"}'
    return '{"data":"Error"}'

#Vista, modificación y eliminación de medicamentos
@app.route('/setmedicamento/<nombre>',methods=['POST'])
def setmedicamento(nombre):
    gestor.setMedicamento(nombre)
    return '{"data":"Entregado"}' 

@app.route('/getmedicamento')
def getmedicamento():
    return gestor.getMedicamento()
@app.route('/actualizamedicamento/<nombre>',methods=['PUT'])
def actualizamedicamento(nombre):
    dato = request.json
    if gestor.actualizar_medicamento(nombre,dato['id'],dato['nombre'],dato['precio'],dato['descripcion'],dato['cantidad']):
        return '{"data":"Actualizado"}'
    return '{"data":"Error"}'  
             
@app.route('/eliminarmedicamento/<nombre>',methods=['DELETE'])
def eliminar_medicamento(nombre):
    if(gestor.eliminar_medicamento(nombre)):
        return '{"data":"Eliminado"}'
    return '{"data":"Error"}'

#Validación de paciente que inició sesión
@app.route('/setloguser/<user>',methods=['POST'])
def setloguser(user):
    gestor.setLoguser(user)
    return '{"data":"Entregado"}' 

@app.route('/getloguser')
def getloguser():
    return gestor.getLoguser() 

#Validación de enfermera que inició sesión
@app.route('/setlogenfermera/<user>',methods=['POST'])
def setlogenfermera(user):
    gestor.setLogenfermera(user)
    return '{"data":"Entregado"}' 

@app.route('/getlogenfermera')
def getlogenfermera():
    return gestor.getLogenfermera() 

#Validación de medico que inició sesión
@app.route('/setlogmedico/<user>',methods=['POST'])
def setlogmedico(user):
    gestor.setLogmedico(user)
    return '{"data":"Entregado"}' 

@app.route('/getlogmedico')
def getlogmedico():
    return gestor.getLogmedico()     

@app.route('/eliminarpedido',methods=['DELETE'])
def eliminar_pedido():
    if(gestor.eliminar_pedido()):
        return '{"data":"Eliminado"}'
    return '{"data":"Error"}'        
#INICIAR EL SERVIDOR

if __name__ == "__main__":
    app.run(host="0.0.0.0",debug=True)