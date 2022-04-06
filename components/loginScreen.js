import React, {Component} from 'react';
import { SafeAreaView, TouchableOpacity, View, Text, TextInput, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useState, useEffect, useReducer }from "react";
import styles from '../styles/style';


export default function LoginScreen({navigation}) {
    const [loggedIn, setloggedIn] = useState(false);
    // const [userInfo, setuserInfo] = useState([]);

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
        'secret'
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
    }, []);

    return (
        <ScrollView style={styles.scroll}>
            <Image style={styles.image} source={require("../images/login-image.png")} />   
            <Text style={styles.Title}> Welcome to the Platform </Text>
            <GoogleSigninButton
                style={{width: 192, height: 48, alignSelf: 'center'}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signIn}
            />
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate( 'Register' )} ><Text style={styles.text}>Register</Text></TouchableOpacity>
        </ScrollView>
    )
}

  
