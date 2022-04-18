import React, {Component} from 'react';
import { SafeAreaView, TouchableOpacity, View, Text, TextInput, Image, ScrollView, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useState, useEffect, useReducer }from "react";
import styles from '../styles/style';


export default function LoginScreen({navigation}) {
    const [loggedIn, setloggedIn] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [uid, setUid] = useState();

    //Sign in using the Firebase Google auth built in function 
    const signIn = async () => {
    try {
        await GoogleSignin.hasPlayServices();
        const {accessToken, idToken} = await GoogleSignin.signIn();
        setloggedIn(true);
        const credential = auth.GoogleAuthProvider.credential(
            idToken,
            accessToken,
        );
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
        '812645138802-c9ugcgbae5gclrdocldio434tv63qfj9.apps.googleusercontent.com',
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
    }, []);

    //Sign in using email and password 
    const logIn = () =>{
        if(email === '' && password === '') {
        Alert.alert('Enter details to signup!')
        } 
        auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            //setting uid takes too long so first time it can't find the info
            //HOW TO FIX THIS
            setUid(user.uid)
            navigation.navigate("Home", {
                uid: uid,
            })
            // ...
        })
    }

    return (
        <View>
            <ImageBackground source={require('../images/ec530-login.png')} style={{width: '100%', height: '100%', resizeMode:'contain'}}  >
                <ScrollView style={styles.scroll}>
                {/* email and password auth */}
                <TextInput 
                    style = {styles.textInput}
                    placeholder = 'Email address'
                    autoCapitalize = 'none'
                    placeholderTextColor = '#000'
                    textAlign ='left'
                    keyboardType = 'default'
                    value = {email}
                    onChangeText = {email => {
                        setEmail( email )
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
                <TouchableOpacity style={styles.button} onPress={() => logIn()} ><Text style={styles.text}>Sign In</Text></TouchableOpacity>
                {/* google email auth */}
                <GoogleSigninButton
                    style={{width: 192, height: 48, alignSelf: 'center'}}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={signIn}
                />
                <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate( 'Register' )} ><Text style={styles.text}>Register</Text></TouchableOpacity>
                </ScrollView>
            </ImageBackground>
        </View>
    )
}

  
