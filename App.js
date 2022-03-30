import React, {useState, useEffect} from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


//importing components for page routings
import homeScreen from "./components/homeScreen";
import loginScreen from "./components/loginScreen";
import registrationScreen from "./components/registrationScreen";



const Stack = createNativeStackNavigator();


const App = () =>{

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={loginScreen} />
        <Stack.Screen name="Register" component={registrationScreen} />
        <Stack.Screen name="Home" component={homeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  
}

export default App;