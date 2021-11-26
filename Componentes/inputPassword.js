import React, {useEffect, useState} from 'react';
import { Button, Container, Heading, Pressable, Icon, Input, Stack, Text } from 'native-base'
import {
  Box,
  
  VStack,
  FormControl,
  
  Link,
  
  HStack,
  Center,
  NativeBaseProvider,
} from "native-base"
import { MaterialIcons } from "@expo/vector-icons"
import axios from 'axios';
import { ImageBackground, StyleSheet, View } from "react-native";




export const InputPassword = ({navigation}) => {
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          
        },
        image: {
          flex: 1,
          justifyContent: "center"
        },
        text: {
          color: "white",
          fontSize: 42,
          lineHeight: 84,
          fontWeight: "bold",
          textAlign: "center",
          backgroundColor: "#000000c0"
        },
        Input:{
            textAlign: "center",
            backgroundColor: "#000000c0",
            color:"white",
            width: "100%"
        },
       
      });
      
    const image = { uri: "https://lh3.googleusercontent.com/-2xRb7hHdYGs/YZevJ8A5faI/AAAAAAAAA-o/g7clPPrnsRgDQwLV6LmoqzilLYHgA8K1QCLcBGAsYHQ/w453-h794/Group%2B119%2B%25281%2529.png" };
    const [isHidden, setIsHidden] = useState(false)

    const [value, setValue] = useState({
        email: '',
        password: ''
    })
    const handleClick = () => setIsHidden (!isHidden)
    const [user,setUsers]=  useState ([]);

    const fetchData = async()=>{
        const response = await axios.post('http://192.168.100.7/ToOrder2/index.php',
        {headers:{'Content-Type': 'multipart/form-data'}})
        setUsers(response.data)
        console.log(user)
        }
        useEffect(()=>{
            fetchData()
        },[])
        const [usert,setUserst]= useState([])
    const handleSubmit  = async () =>{
        const formData=new FormData();
        formData.append('TokendeIngreso', value.TokendeIngreso)
        formData.append('Password', value.Password)
        const response = await axios.post(
        'http://192.168.100.7/ToOrder/public/api/LoginTrabajador', 
        formData,
        {headers: { 'Accept': 'application/json'}}
            )
            if(response.data != ""){
                setUserst(JSON.stringify(response.data));
                console.log(response.data);
                navigation.navigate('Uno',{
                    TokendeIngreso:value.TokendeIngreso,
                    Password:value.Password
                })
           
            }
            
       
        console.log(JSON.stringify(response.data))
      
        }
    
    const Submit = () =>{
        return <Button onPress={handleSubmit}>Login</Button>
    }

    const ver =()=>{
        handleSubmit();
      
       navigation.navigate('Uno',{
           TokendeIngreso:value.TokendeIngreso,
           Password:value.Password
       })
        
    }
  return(

         <NativeBaseProvider>
              <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Center flex={1} px="3">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Bienvenido
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Comienza ahora mismo!!
        </Heading>
  
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>IngresaToken</FormControl.Label>
            <Input placeholder="claveAcceso" 
            onChangeText={(text) => setValue ({...value, TokendeIngreso:text})}
        />
          </FormControl>
          <FormControl>
            <FormControl.Label  >Password</FormControl.Label>
            <Input placeholder="Password" 
            type={isHidden ? "text" : "password"}
            onChangeText={(text) => setValue ({... value, Password:text})}
            InputRightElement={
               <Pressable   p={2} borderWidth={0} onPress={handleClick} >
                  <Icon  as={<MaterialIcons name={isHidden ? "visibility-off" : "visibility"}/> } 


              size={5}
              m={2}
              name="home" />
            </Pressable>
        }       
        />
            <Link
              _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "indigo.500",
              }}
              alignSelf="flex-end"
              mt="1"
            >
              olvidaste la contraseña?
            </Link>
          </FormControl>
          <Button mt="2" onPress={handleSubmit} colorScheme="indigo">
            Sign in
          </Button>
        
        </VStack>
      </Box>
        </Center>
        </ImageBackground>
        </NativeBaseProvider>
       
    )
            }