from Usuarios import Usuario
from Medicos import Medico
from Enfermeras import Enfermera
from Medicamentos import Medicamento
from cita import Cita
from Pedidos import Pedido
import json
import re
#Aloja el paciente a ver, modificar o eliminar
vpaciente=''  
#Aloja el medico a ver, modificar o eliminar
vmedico=''
#Aloja la enfermera a ver, modificar o eliminar
venfermera=''
#Aloja el medicamento a ver, modificar o eliminar
vmedicamento=''
idmedicamento=0
#Aloja los usuarios que inician sesión
logpaciente=''
#Aloja las enfermeras que inician sesión
logenfermera=''
#Aloja los médicos que inician sesión
logmedico=''

#ID citas
idcita=0
#ID pedidos
idpedido=0
class Gestor:


    def __init__(self):
        self.usuarios =[]
        self.medicos=[]
        self.enfermeras=[]
        self.medicamentos=[]
        self.citas=[]
        self.pedidos=[]

        self.usuarios.append(Usuario("Herbert","Reyes","None","M","admin","1234","m"))
        
        #Medicos
        
        #Enfermeras
       
        #Medicamentoss
        


        #Usuario seleccionado
        
        
    #Create

    #Read
    def obtener_usuarios(self):
        return json.dumps([ob.__dict__ for ob in self.usuarios])
    
    def obtener_medicos(self):
        return json.dumps([ob.__dict__ for ob in self.medicos])

    def obtener_enfermeras(self):
        return json.dumps([ob.__dict__ for ob in self.enfermeras])
    
    def obtener_medicamentos(self):
        return json.dumps([ob.__dict__ for ob in self.medicamentos])

    def obtener_citas(self):
        return json.dumps([ob.__dict__ for ob in self.citas])  

    def obtener_pedidos(self):
        return json.dumps([ob.__dict__ for ob in self.pedidos])          
    #Update

    #Delete

    #Inciarsesion
    def iniciar_sesion(self,user,password): 
        for x in self.usuarios:
            if x.password==password and x.user == user:
                return json.dumps(x.__dict__)
        return '{"nombre":"false"}'

    def iniciar_sesionmedico(self,user,password): 
        for x in self.medicos:
            if x.password==password and x.user == user:
                return json.dumps(x.__dict__)
        return '{"nombre":"false"}'   

    def iniciar_sesionenfermera(self,user,password): 
        for x in self.enfermeras:
            if x.password==password and x.user == user:
                return json.dumps(x.__dict__)
        return '{"nombre":"false"}'       

    #Registrar pacientes
    def registrar_usuario(self,nombre,apellido,fecha,sexo,user,password,telefono):
        self.usuarios.append(Usuario(nombre,apellido,fecha,sexo,user,password,telefono))
    #Registrar medicos
    def registrar_medico(self,nombre,apellido,fecha,sexo,user,password,especialidad,telefono):
        self.medicos.append(Medico(nombre,apellido,fecha,sexo,user,password,especialidad,telefono))
    #Registrar enfermeras
    def registrar_enfermera(self,nombre,apellido,fecha,sexo,user,password,telefono):
        self.enfermeras.append(Enfermera(nombre,apellido,fecha,sexo,user,password,telefono))
    #Registrar medicamentos
    def registrar_medicamento(self,nombre,precio,descripcion,cantidad):
        global idmedicamento
        idmedicamento=idmedicamento+1
        self.medicamentos.append(Medicamento(idmedicamento,nombre,precio,descripcion,cantidad))  
    #Registrar cita
    def registrar_cita(self,paciente,fecha,hora,motivo,estado,usermedico,medico):
        global idcita
        idcita=idcita+1
        self.citas.append(Cita(idcita,paciente,fecha,hora,motivo,estado,usermedico,medico))

    def actualizar_cita(self,id,paciente,fecha,hora,motivo,estado,usermedico,medico):
    
        for x in self.citas:
            if x.id==int(id) or x.id==id:
                
                self.citas[self.citas.index(x)]=Cita(id, paciente, fecha, hora, motivo, estado,usermedico, medico)
                return True
        return False   

    #Registro de pedidos
    def registrar_pedido(self,usuario,producto,precio,cantidad):
        global idpedido
        idpedido=idpedido+1
        self.pedidos.append(Pedido(idpedido, usuario, producto, precio, cantidad))

    def actualizar_pedido(self,id,usuario,producto,precio,cantidad):
        for x in self.pedidos:
            if x.id==int(id) or x.id==id:
                self.pedidos[self.pedidos.index(x)]=Pedido(id, usuario, producto, precio, cantidad)
                return True
        return False  

    def eliminar_pedido(self):  
        while True:
                self.pedidos.remove(x)
                return True
        return False    

    #Buscar pacientes
    def buscar_pacientes(self,user):
        for x in self.usuarios:
            if x.user==user:
                return json.dumps(x.__dict__)
        return '{"user":"false"}'    
    #Carga masiva de pacientes            
    def cargamasiva(self,data):
        datos = re.split('\n',data)
        print(datos[0])
        i=1
        while i < len(datos):
            texto = re.split(',',datos[i])
            self.registrar_usuario(texto[0],texto[1],texto[2],texto[3],texto[4],texto[5],texto[6])
            i = i+1 
    #Carga masiva médicos
    def cargamasivamed(self,data):
        hola = re.split('\n',data)
        print(hola[0])
        i=1
        while i < len(hola):
            texto = re.split(',',hola[i])
            self.registrar_medico(texto[0],texto[1],texto[2],texto[3],texto[4],texto[5],texto[6],texto[7])
            i = i+1 
    #Carga masiva enfermeras
    def cargamasivaenf(self,data):
        hola = re.split('\n',data)
        print(hola[0])
        i=1
        while i < len(hola):
            texto = re.split(',',hola[i])
            self.registrar_enfermera(texto[0],texto[1],texto[2],texto[3],texto[4],texto[5],texto[6])
            i = i+1 
    #Carga masiva medicamentos
    def cargamasivamedi(self,data):
        hola = re.split('\n',data)
        print(hola[0])
        i=1
        while i < len(hola):
            global idmedicamento
            texto = re.split(',',hola[i])
            self.registrar_medicamento(texto[0],texto[1],texto[2],texto[3])
            i = i+1 
    #Dando valor a usuario seleccionado
    def setPaciente(self,paciente):
        global vpaciente
        vpaciente=paciente
        
    def getPaciente(self):
        global vpaciente
        for x in self.usuarios:
            if x.user==vpaciente:
                return json.dumps(x.__dict__)
        return '{"user":"false"}'
    def actualizar_usuario(self,usuarioviejo,nombre,apellido,fecha,sexo,usuarionuevo,password,telefono):
        for x in self.usuarios:
            if x.user==usuarioviejo:
                self.usuarios[self.usuarios.index(x)]=Usuario(nombre,apellido,fecha,sexo,usuarionuevo,password,telefono)
                return True
        return False
         
    def eliminar_usuario(self,user):
        print("Hola")
        for x in self.usuarios:
            if x.user==user: 
                self.usuarios.remove(x)
                return True
        return False     
    #Update y delete de médicos
    #Dando valor a paciente seleccionado
    def setMedico(self,medico):
        global vmedico
        vmedico=medico
        
    def getMedico(self):
        global vmedico
        for x in self.medicos:
            if x.user==vmedico:
                return json.dumps(x.__dict__)
        return '{"user":"false"}'
    def actualizar_medico(self,usuarioviejo,nombre,apellido,fecha,sexo,usuarionuevo,password,especialidad,telefono):
        for x in self.medicos:
            if x.user==usuarioviejo:
                self.medicos[self.medicos.index(x)]=Medico(nombre,apellido,fecha,sexo,usuarionuevo,password,especialidad,telefono)
                return True
        return False
         
    def eliminar_medico(self,user):
        for x in self.medicos:
            if x.user==user:
                self.medicos.remove(x)
                return True
        return False     

    #Update y delete de enfermeras
    #Dando valor a paciente seleccionado
    def setEnfermera(self,enfermera):
        global venfermera
        venfermera=enfermera
        
    def getEnfermera(self):
        global venfermera
        for x in self.enfermeras:
            if x.user==venfermera:
                return json.dumps(x.__dict__)
        return '{"user":"false"}'
    def actualizar_enfermera(self,usuarioviejo,nombre,apellido,fecha,sexo,usuarionuevo,password,telefono):
        for x in self.enfermeras:
            if x.user==usuarioviejo:
                self.enfermeras[self.enfermeras.index(x)]=Enfermera(nombre,apellido,fecha,sexo,usuarionuevo,password,telefono)
                return True
        return False
         
    def eliminar_enfermera(self,user):
        for x in self.enfermeras:
            if x.user==user:
                self.enfermeras.remove(x)
                return True
        return False

    #Update y delete de medicamentos
    #Dando valor a medicamento seleccionado
    def setMedicamento(self,medicamento):
        global vmedicamento
        vmedicamento=medicamento
        
    def getMedicamento(self):
        global vmedicamento
        for x in self.medicamentos:
            if x.nombre==vmedicamento:
                return json.dumps(x.__dict__)
        return '{"nombre":"false"}'
    def actualizar_medicamento(self,nombreviejo,id,nombrenuevo,precio,descripcion,cantidad):
        for x in self.medicamentos:
            if x.nombre==nombreviejo:
                self.medicamentos[self.medicamentos.index(x)]=Medicamento(id,nombrenuevo,precio,descripcion,cantidad)
                return True
        return False
         
    def eliminar_medicamento(self,nombre):
        for x in self.medicamentos:
            if x.nombre==nombre:
                self.medicamentos.remove(x)
                return True
        return False      


    #Usuario paciente que inicia sesión
    def setLoguser(self,paciente):
        global logpaciente
        logpaciente=paciente
        
    def getLoguser(self):
        global logpaciente
        for x in self.usuarios:
            if x.user==logpaciente:
                return json.dumps(x.__dict__)    

    #Usuario enfermera que inicia sesión
    def setLogenfermera(self,enfermera):
        global logenfermera
        logenfermera=enfermera
        
    def getLogenfermera(self):
        global logenfermera
        for x in self.enfermeras:
            if x.user==logenfermera:
                return json.dumps(x.__dict__)  
    #Medico que inicia sesion
    def setLogmedico(self,medico):
        global logmedico
        logmedico=medico
        
    def getLogmedico(self):
        global logmedico
        for x in self.medicos:
            if x.user==logmedico:
                return json.dumps(x.__dict__)                                         

                