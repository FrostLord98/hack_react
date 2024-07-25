import Usuarios from './components/Usuarios/InformacionUsuario'
import { ChakraProvider, extendTheme} from '@chakra-ui/react'
import './App.css'

function App() {

    const theme = extendTheme({ 
        colors: {
            agregar: {
               500: "#27AE60",
            },
            borrar: {
                500: "#D50A0A"
             },
            actualizar: {
               500: "#0A76D5"
             }
          }
        })


    return (
        
        <ChakraProvider theme={theme}>
            
            <Usuarios/>
  
        </ChakraProvider>
    )
}

export default App
