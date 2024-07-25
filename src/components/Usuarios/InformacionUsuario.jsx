import { useState, useEffect } from "react"
import instance from "../Fetch/AWS_Fetch.js";
import {agregarUsuario,eliminarUsuario,cambiarCorreo,cambiarNombre} from "../Fetch/FetchUsuarios.js";
import { 
    Input, 
    Flex, 
    Center, 
    Button, 
    Stack,
    FormControl,
    FormLabel,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,

} from '@chakra-ui/react'




export default function Usuarios() {
    const [edadesUsuarios, setEdadesUsuarios] = useState([]);
    const [correosUsuarios, setCorreosUsuarios] = useState([]);
    const [nombresUsuarios, setNombresUsuarios] = useState([]);
    
    const FetchNombres =()=>{
        useEffect(() => {
            const getData = async () => {
                const response = await instance.get("/nombres");
                let data = response.data
                setNombresUsuarios(data)
            }
            getData()
        },[])

    } 
    const FetchEdades =()=>{
        useEffect(() => {
            const getData = async () => {
                const response = await instance.get("/edades");
                let data = response.data
                setEdadesUsuarios(data)
            }
            getData()
        },[])

    } 
    const FetchCorreos =()=>{
        useEffect(() => {
            const getData = async () => {
                const response = await instance.get("/correos");
                let data = response.data
                setCorreosUsuarios(data)
            }
            getData()
        },[])

    } 

    

    const [nombresAlias,setNombresAlias] = useState("");
    const [edadesAlias,setEdadesAlias] = useState("");
    const [correosAlias,setCorreosAlias] = useState("");

    
    const handlerInputNombre = evt => {
        const re = /^[a-zA-Z]+$/;
    
        if (evt.target.value === '' || re.test(evt.target.value)) {
            setNombresAlias(evt.target.value)
        }
    }
    

    const handlerInputCorreo = evt => {
        setCorreosAlias(evt.target.value);
    }
    
    const handlerInputEdad = evt => {
        setEdadesAlias(evt.target.value);
    }

    const listaDeNombresUsuarios =  () => {
        FetchNombres()
        return nombresUsuarios.map((item, index) => {
            if (item.length > 9) {
                let data = []
                let i = 0
                for (let c of item) {
                    data.push(c)
                    i++
                    if (i > 9) {
                        return <li key={index}>{data}...</li>
                    } 
                }
            }
            return <li key={index}>{item}</li>
    })
    }


    const listaDeCorreosUsuarios = () => {
        FetchCorreos()
        return  correosUsuarios.map((item, index) => {
            return <li key={index}>{item}</li>
        })
    }

    const listaDeEdadesUsuarios = () => {
        FetchEdades()
        return edadesUsuarios.map((item, index) => {
            return <li key={index}>{item}</li>
        })
    }


    const fnAdd = (evt) => {
        evt.preventDefault()
        if (nombresAlias === "" || edadesAlias === "" || correosAlias === "") {
            return alert("Todos los campos son obligatorios")
        }
        else if (nombresUsuarios.includes(nombresAlias)) {
            return alert("El usuario ya existe")
            
        }
        else if (correosUsuarios.includes(correosAlias)) {
            return alert("El correo ya existe")
        }
        agregarUsuario(nombresAlias, correosAlias, edadesAlias)
        return alert("Usuario agregado")
    }

    const fnBuscar = (evt) => {
        evt.preventDefault()
        if (nombresAlias === "") {
            return alert("Todos los campos son obligatorios")
        }
        const posicion = nombresUsuarios.indexOf(nombresAlias);
        if (posicion > -1) {
            return alert (`El usuario ${nombresAlias} tiene una edad de ${edadesUsuarios[posicion]} y su correo es ${correosUsuarios[posicion]}`)
        }
        else {
            return alert("El usuario no existe")
        
    }}


    const fnDelete = (evt) => {
        evt.preventDefault()
        const posicion = nombresUsuarios.indexOf(nombresAlias);
        if (posicion > -1) { // only splice array when item is found

            eliminarUsuario(nombresAlias)

            return alert("Usuario eliminado")
        }
    }

    const fnUpdate = (evt) => {
        evt.preventDefault()
        if (nombresAlias === "" ||  correosAlias === "" ) {
            return alert("Todos los campos son obligatorios")
        }
        else if (nombresUsuarios.includes(nombresAlias)) {
            if (correosUsuarios.includes(correosAlias)) {
                return alert("El correo ya existe")
            }
            cambiarCorreo(correosAlias, nombresAlias)
        }
        else if (correosUsuarios.includes(correosAlias)) {
            if (nombresUsuarios.includes(nombresAlias)) {
                return alert("El usuario ya existe")
            }
            cambiarNombre(correosAlias, nombresAlias)
        }   

        return alert("Usuario actualizado")
     
        }
 
    return (
        <Flex alignContent={"center"} justifyContent={"center"} w={'100vw'} h={'100%'}   >
            <Center  w={'50%'} h={'100%'} display={"flex"} flexDirection={"column"} className="center">
            <div >
                
                <Tabs size={"md"}>
                <TabList className="tabs">
                    <Tab>Agregar usuario</Tab>
                    <Tab>Borrar usuario</Tab>
                    <Tab>Actualizar usuario</Tab>
                    <Tab>Buscar usuario</Tab>
                    <Tab>Mostrar todos los usuarios</Tab>
                </TabList>

                <TabPanels className="contenido">

                        
                    <TabPanel>
                        <form action="" className="agregar" >
                            <br /><br /> 
                            <FormLabel >Nombre</FormLabel>
                            <Input   value={nombresAlias} borderColor={"black"} required className="input" onChange={handlerInputNombre}  placeholder="Nombre" htmlSize={50} width='auto'  errorBorderColor='black'/>
                            <br /><br />
                            <FormLabel >Correo</FormLabel>
                            <Input   value={correosAlias} borderColor={"black"}  className="input" onChange={handlerInputCorreo} required placeholder="Correo" htmlSize={50} width='auto'  errorBorderColor='black'/>
                            <br /><br /> 
                            <FormLabel >Edad</FormLabel>
                            <Input value={edadesAlias} type="number" min={0} max={99} maxLength={2} borderColor={"black"}  placeholder="Edad" onChange={handlerInputEdad}  errorBorderColor='black'  className="edad"  width='auto'/>
                            <Button  type="submit" className="botonAgregar" colorScheme='agregar' variant='solid'  onClick={fnAdd}>Agregar</Button>
                        </form>
                        
                    </TabPanel>

                    <TabPanel>
                        <FormControl className="borrar">
                            <br /><br /> 
                            <FormLabel >Nombre</FormLabel>
                            <Input  value={nombresAlias} borderColor={"black"}  className="input" onChange={handlerInputNombre} required ={true} placeholder="Nombre" htmlSize={50} width='auto'  errorBorderColor='black'/>
                            <br /><br />

                            <Button className="botones" colorScheme='borrar' variant='solid' onClick={fnDelete}>Eliminar</Button>
                        </FormControl>
                    </TabPanel>

                    <TabPanel>
                        <FormControl className="actualizar">
                            <br /><br /> 
                            <FormLabel >Nombre</FormLabel>
                            <Input  value={nombresAlias} borderColor={"black"}  className="input" onChange={handlerInputNombre} required ={true} placeholder="Nombre" htmlSize={50} width='auto'  errorBorderColor='black'/>
                            <br /><br />
                            <FormLabel >Correo</FormLabel>
                            <Input  value={correosAlias} borderColor={"black"}  className="input" onChange={handlerInputCorreo} required placeholder="Correo" htmlSize={50} width='auto'  errorBorderColor='black'/>
                            <br /><br /> 
                

                            <Button className="botones" colorScheme='actualizar' variant='solid' onClick={fnUpdate}>Actualizar</Button>
                            </FormControl>
                    </TabPanel>
                    <TabPanel>
                            <FormControl className="buscar">
                                <br /><br /> 
                                <FormLabel >Nombre</FormLabel>
                                <Input  value={nombresAlias} borderColor={"black"}  className="input" onChange={handlerInputNombre} required ={true} placeholder="Nombre" htmlSize={50} width='auto'  errorBorderColor='black'/>
                                <br /><br />

                                <Button className="botonBuscar" colorScheme='teal' variant='solid' onClick={fnBuscar}>Buscar usuario</Button>
                            </FormControl>
                    </TabPanel>

                    <TabPanel>  
                    <h1 className="show">Usuarios: {nombresUsuarios.length}</h1>
                        <Flex className="flex">
                        <ol className="lista">Nombre:
                            {listaDeNombresUsuarios()}
                        </ol>
                        <br />

                        <Stack direction='row' spacing={4}>
                        <ol className="lista">Correo:
                            {listaDeCorreosUsuarios()}
                        </ol>
                        <br />
                        </Stack>

                        <ol className="lista">Edad:
                            {listaDeEdadesUsuarios()}
                        </ol>
                        <br />
                        </Flex> 
                    </TabPanel>

                    </TabPanels>
                    </Tabs>
            
                              
                
                
            </div>
            </Center>
        </Flex>  
            
    );
}