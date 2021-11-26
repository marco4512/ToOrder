import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { Spacer,NativeBaseProvider,FlatList,Image,Stack,Input,HStack,Box,Center,VStack, Button, ButtonGroup,Icon,extendTheme, Container, Heading,Circle,Square, useScreenReaderEnabled} from 'native-base';
import { MaterialIcons } from "@expo/vector-icons"
import axios from 'axios';
import { Avatar } from 'native-base';
export const uno = ({navigation,route}) => {
  
  const[value,setValue]= React.useState("")
  const handleChange =(event:any)=>{
    setValue(event.target.value)

  }
  const {Password} = route.params
  const {TokendeIngreso} = route.params
  const [usert,setUserst]= useState([]);
  const [idcomandasmalas,setidcomandasmalas]= useState([]);
  const [CategoriaTrabajador,setCategoriaTrabajador]= useState([]);
  const [comandasenviadas,setcomandasenviadas]= useState([]);
  const [comandas,setcomandas]= useState([]);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      
    },
    image: {
      flex: 1,
      justifyContent: "center"
    },
    text: {
      color: "black",
      fontSize: 42,
      lineHeight: 84,
      fontWeight: "bold",
      textAlign: "center",
  
    },
    Box:{
  
        backgroundColor: "white"
        
    },
    textnombre:{
      color: "white",
      fontSize: 15,
      lineHeight: 84,
      fontWeight: "bold",
      textAlign: "center",
    },
    Center:{
      backgroundColor:"#544179",
    }
   
  });
 
  const handleSubmit  = async () =>{
    console.log('Password',Password);
    const formData=new FormData();
    formData.append('TokendeIngreso', TokendeIngreso )
    formData.append('Password', Password)
    const response = await axios.post(
    'http://192.168.100.7/ToOrder/public/api/LoginTrabajador', 
    formData,
    {headers: { 'Accept': 'application/json'}}
        )
        if(response.data != ""){
            console.log('Datos trabajador pagina 2',JSON.stringify(response.data));
            console.log(response.data);
            setUserst(response.data);
            
           
       
        }
        
   
    console.log(JSON.stringify(response.data))
  
    }
  
    useEffect(() => {
     
      handleSubmit();
      
    
     
    }, []);
  
      //Función para acturalizar cada 5 segundos(5000 milisegundos)
      
      const Actualizar  = async ()=>{
        Cargar()
        console.log("----------Eliminadas-----------------")
        console.log(comandasenviadas)
        console.log("----------Pushi-----------------")
    console.log(idcomandasmalas)
      
        }
        const Cargar  = async () =>{
          const formData=new FormData();
          formData.append('TokendeIngreso', TokendeIngreso )
          formData.append('Password', Password)
         
          const response = await axios.post(
          'http://192.168.100.7/ToOrder/public/api/ImprimeComanda', 
          formData,
          {headers: { 'Accept': 'application/json'}}
              )
              if(response.data != ""){
                  console.log('Datos comanda',JSON.stringify(response.data));
                  console.log(response.data);
                  setcomandas(response.data);
                  if(usert.map(dataItem =>(dataItem.idRol))==2){
                    CategoriaTrabajador.push(1)
                  }
                  if(usert.map(dataItem =>(dataItem.idRol))==4){
                    CategoriaTrabajador.push(2)
                  }
                  
                  
             
              }
              
         
          console.log(JSON.stringify(response.data))
        
          }
          const CargarTrabajorComanda  = (idComanda:number) =>{
          
            const CargarDta  = async () =>{
              console.log("idComanda",idComanda)
              console.log("idTrabajador",usert)
              const formData=new FormData();
              formData.append('idComanda',  idComanda )
              formData.append('idTrabajadores', usert.map(dataItem =>(dataItem.idTrabajadores)))
              const response = await axios.post(
              'http://192.168.100.7/ToOrder/public/api/IngresarTrabajadorComanda', 
              formData,
              {headers: { 'Accept': 'application/json'}}
                  )
                  if(response.data != ""){
                      console.log('Datos comanda',JSON.stringify(response.data));
                      console.log(response.data);
                      setcomandas(response.data);
    
                      
                 
                  }
             
              console.log(JSON.stringify(response.data))
            
              }
              CargarDta();

            }
          
        

      
          const handleDelete = (index:number) => {
            console.log("Entrando",index)
            const temp = comandas.filter((itemI) => itemI.idComanda !== index)
            console.log (temp)
            setcomandasenviadas(temp)
            setcomandas(temp)
            idcomandasmalas.push(index)
          
          }


  return (
    <NativeBaseProvider>
       <Center style={styles.Center}  flex={.35} px="3">
       <Box>
         <Text style={styles.textnombre}>
           
         </Text>
       </Box>
       </Center>
    <Center  style={styles.Center}  flex={1.5} px="3">
    <Box
      w={{
        base: "100%",
        md: "25%",
      }}
    >
      <FlatList
     
        data={usert}
        renderItem={({ item }) => (
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: "gray.600",
            }}
            borderColor="coolGray.200"
            pl="4"
            pr="5"
            py="2"
          >
            <HStack space={3} justifyContent="space-between">
              <Avatar
                size="60px"
                source={{
                  uri: item.UrlImagen,
                }}
              >
                 <Avatar.Badge bg="green.500" />
                </Avatar>
             
              <VStack>
                <Text style={styles.textnombre}
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  bold
                  size={12}
                >
                  {item.nombre+" "+item.apellidos}
                </Text>
               
              </VStack>
              <Spacer />
              
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => item.idTrabajadores}
      />
    </Box>
      </Center>
      <Center flex={9} px="3" >
      <Heading p="4" pb="3" size="lg">
          Productos
        </Heading>
      <Box
      w={{
        base: "100%",
        md: "25%",
      }}
    >
      <FlatList
     
        data={comandas.filter((itemI) => !idcomandasmalas.includes(itemI.idComanda) && (CategoriaTrabajador.includes(itemI.idCategorias)))}
        renderItem={({ item }) => (
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: "gray.600",
            }}
            borderColor="coolGray.200"
            pl="4"
            pr="5"
            py="2"
          >
            <HStack space={3} justifyContent="space-between">
              <Avatar
                size="60px"
                source={{
                  uri: item.UrlImagen,
                }}
              >
                
                 <Avatar.Badge bg="red.500" />
                </Avatar>
             
              <VStack>
                <Text 
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="black"
                  bold
                  size={12}
                >
                  {"Producto: "+item.Descripcion}
                </Text>
                <Text 
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="black"
                  bold
                  size={12}
                >
                  {"Mesa:"+item.nombreMesa}
                </Text>
               
                <Text color="coolGray.600" _dark={{ color: 'warmGray.200' }}>{"X "+item.cantidad}</Text>
                <Button onPress={() => handleDelete(item.idComanda)} >Hecho</Button>
            </VStack>
            <Spacer />
            <Text fontSize="xs" color="coolGray.800"  _dark={{ color: 'warmGray.50' }} alignSelf="flex-start">
              {item.Horainicio}
            </Text>
            
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => item.idComanda}
      />
    </Box>
       </Center>
        <Center flex={1} px="3" style={styles.Box}>
       <Box   > 
       <Button onPress={Actualizar} >Recargar</Button>
       </Box>
        </Center>
    </NativeBaseProvider>
  )
}
