import React, {Component} from 'react';
import { SafeAreaView, TouchableOpacity, View, Text, TextInput, Image, ScrollView, KeyboardAvoidingView, Alert, ImageBackground } from 'react-native';
import styles from '../styles/registerStyle';
import { useState, useEffect, useReducer }from "react";
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Picker} from '@react-native-picker/picker';

export default function RegistrationScreen({navigation}) {

    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [role, setRole] = useState()
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [uid, setUid] = useState();

    const [loggedIn, setloggedIn] = useState(false);
    // const [userInfo, setuserInfo] = useState([]);

    //Register a new user with email and password   
    registerUser = () => {
        if(email === '' && password === '') {
        Alert.alert('Enter details to signup!')
        } 
        auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
            res.user.updateProfile({
            displayName: firstName + '' + lastName,
            email: email
            })
            console.log('User registered successfully!')
            firestore().collection('users').doc(res.user.uid).set({
                role: role
            })
            setUid(res.user.uid)
            navigation.navigate("Home", {
                uid: uid,
                role: role
            })
        })
        .catch(error => console.log(error))      
        }
    

   
    return (
        
       <View>
            <ImageBackground source={require('../images/ec530-register.png')} style={{width: '100%', height: '100%', resizeMode:'contain'}}  >
            <TextInput
                style = {styles.textInput}
                placeholder = 'First Name'
                placeholderTextColor = '#000'
                textAlign ='left'
                value = {firstName}
                keyboardType = 'default'
                onChangeText = {firstName => {
                    setFirstName( firstName )
                }}
                maxLength = {20}
            />
            <TextInput
                style = {styles.textInput2}
                placeholder = 'Last Name'
                placeholderTextColor = '#000'
                textAlign ='left'
                keyboardType = 'default'
                value = {lastName}
                onChangeText = {lastName => {
                    setLastName( lastName )
                }}
                maxLength = {20}
            />
            {/* this should be a drop down option menu */}
            <View style={styles.switchRow}>
                <View style={{flex:.3}}>
                    <Text style={styles.info_text2}>Role</Text>
                </View>
                <View style={styles.picker}>
                    <Picker 
                        selectedValue={role}
                        onValueChange={(itemValue, itemIndex) =>
                            setRole(itemValue)
                        }>
                        <Picker.Item label='Patient' value={'Patient'}/>
                        <Picker.Item label='Nurse' value={'Nurse'}/>
                        <Picker.Item label='Doctor' value={'Doctor'}/>
                    </Picker>
                </View>
            </View>
            <TextInput 
                style = {styles.textInput2}
                placeholder = 'Email address'
                autoCapitalize = 'none'
                placeholderTextColor = '#000'
                textAlign ='left'
                keyboardType = 'default'
                value = {email}
                onChangeText = {email => {
                    setEmail( email)
                }}
            />
            <TextInput 
                style = {styles.textInput2}
                placeholder = 'Password'
                placeholderTextColor = '#000'
                textAlign ='left'
                keyboardType = 'default'
                value = {password}
                onChangeText = {password => {
                    setPassword( password )
                }}
            />
            <TouchableOpacity
                style = {[styles.button, {marginTop: 20}]}
                onPress = {registerUser}>
                    <Text style={styles.text}>
                    Complete Registration
                    </Text>
            </TouchableOpacity>
            </ImageBackground>
        </View>
    )
  
}