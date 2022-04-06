import React, {Component} from 'react';
import { SafeAreaView, TouchableOpacity, View, Text, TextInput, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import styles from '../styles/style';
import { useState, useEffect, useReducer }from "react";
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function RegistrationScreen({navigation}) {

    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [role, setRole] = useState()

    const [loggedIn, setloggedIn] = useState(false);
    // const [userInfo, setuserInfo] = useState([]);

    //Sign in using the Firebase Google auth built in function 
    const register_user = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const {accessToken, idToken} = await GoogleSignin.signIn();
            setloggedIn(true);
            const credential = auth.GoogleAuthProvider.credential(
                idToken,
                accessToken,
            );
            //update user information
            //need to get UID to set up this information. HOW???
            firestore().doc('users/' + idToken).set({
                  role: role,
                  firstName: firstName,
                  lastName: lastName
            })
            await auth().signInWithCredential(credential).then(navigation.navigate("Home"));
            // navigation.navigate("Home");
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
            } else {
            // some other error happened
            }
        }
    };

    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
            webClientId:
            'secret', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        });
    }, []);

    return (
        
       <View>
            <Text style={styles.info_text}> Please enter the following information </Text>
            <TextInput
                style = {styles.textInput}
                placeholder = 'First Name'
                placeholderTextColor = '#000'
                textAlign ='left'
                value = {firstName}
                keyboardType = 'default'
                onChangeText = {firstName => {
                    setFirstName( {firstName} )
                }}
                maxLength = {20}
            />
            <TextInput
                style = {styles.textInput}
                placeholder = 'Last Name'
                placeholderTextColor = '#000'
                textAlign ='left'
                keyboardType = 'default'
                value = {lastName}
                onChangeText = {lastName => {
                    setLastName( {lastName} )
                }}
                maxLength = {20}
            />
            {/* this should be a drop down option menu */}
            <TextInput 
                style = {styles.textInput}
                placeholder = 'Role'
                placeholderTextColor = '#000'
                textAlign ='left'
                keyboardType = 'default'
                value = {role}
                onChangeText = {role => {
                    setRole( {role} )
                }}
                maxLength = {20}
            />
            <TouchableOpacity
                style = {[styles.button, {marginTop: 20}]}
                onPress = {register_user}>
                    <Text style={styles.text}>
                    Complete Registration
                    </Text>
            </TouchableOpacity>
            
        </View>
    )
  
}