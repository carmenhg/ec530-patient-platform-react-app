import React, {useState, useEffect} from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


//importing components for page routings
import HomeScreen from "./components/homeScreen";
import LoginScreen from "./components/loginScreen";
import RegistrationScreen from "./components/registrationScreen";



const Stack = createNativeStackNavigator();


const App = () =>{

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegistrationScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  
}

export default App;