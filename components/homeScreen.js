import React, {Component} from 'react';
import { useState, useEffect, useReducer }from "react";
import { SafeAreaView, TouchableOpacity, View, Text, TextInput, Image, ScrollView, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import styles from '../styles/homeStyle';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
import AppleHealthKit, { HealthValue, HealthKitPermissions } from 'react-native-health';
import Modal from "react-native-modal";

//This view will change depending on the user's role (patient or MP)
export default function HomeScreen({navigation, route}) {

    //loading constant to wait for Firebase to load the data 
    const [isLoading, setIsLoading] = useState(true)
    //need to pull user info and display in this screen
    const [role, setRole] = useState()

    const getUserInfo = async() => {
        try {
            const role = await firestore().collection('users').doc(route.params.uid).get();
            
            if (role.data() == null)
            {
            }
            else {
                console.log(role.data())
                setRole(role.data()['role'])
                setIsLoading(false)
            }
        } catch {
            console.log("Error")
        }
    };

    //effect will run every time the user navigates to this screen, It will always pull updated info
    useEffect(() => {
        getUserInfo();
    }, [])

    ///////////////////////////// Apple HealthKit Init ///////////////////////////////////
    /* Permission options */
    let options = {
    permissions: {
        read: ['Height', 'Weight', 'StepCount', 'DateOfBirth', 'BodyMassIndex'],
        write: ['Weight', 'StepCount', 'BodyMassIndex'],
    },
    }

    AppleHealthKit.initHealthKit(
    (options: HealthInputOptions),
    (err: string, results: boolean) => {
        if (err) {
        console.log('error initializing Healthkit: ', err)
        return
        }
        else{
        }
        // Healthkit is initialized...
        // now safe to read and write Healthkit data...
    },
    )
    
    ///////////////////////////// API Call to check data  ///////////////////////////////////
    //Read data from Healthkit
    const handleData = () =>{
        //open a modal with checklist 
        //all that the user selects will be passed through the api: this will need to happen one by one?
        AppleHealthKit.getLatestHeight(null, (err: string, results: HealthValue) => {
        if (err) {
            console.log('error getting latest height: ', err)
            return
        }
        var latestHeight = results;
        console.log(results)
        })

        AppleHealthKit.getLatestWeight(options, (err: string, results: HealthValue) => {
        if (err) {
            console.log('error getting latest weight: ', err)
            return
        }
        var latestWeight = results;
        console.log(results)
        })

        toggleModal()
    }

    ///////////////////////////////// Modal Handling ////////////////////////////////////////////////////
    const MP = 'MP';
    const PATIENT = 'PATIENT';
    //modal state 
    const [type, setType] = useState(PATIENT);
    const [isShowing, setIsShowing] = useState(false);

    //function to open and close modal
    const toggleModal = (type) =>{
        setIsShowing(!isShowing);
        setType(type);
    }

    const renderModalContent = (type) => {
        switch(type) {
            case MP: {
                return (
                    <View>
                        <TouchableOpacity onPress={() => handleData()} ><Text>Add Device Data</Text></TouchableOpacity>
                    </View>
                )
            }
            case PATIENT: {
                return (
                    <View>
                        <TouchableOpacity onPress={() => handleData()} ><Text>Add Device Data</Text></TouchableOpacity>
                    </View>
                )
            }
        }
    }


    //WORK IN PROGRESS: idea is to wait to render view until firestore gets all the data needed to display
    // if(isLoading){
    //     return (
    //         <View>
    //             <ActivityIndicator size="large" color="#00ff00" />
    //         </View>  
    //     )
    // }

    //if the view is admin
    if(role == 'Admin'){
        return (
            <View>
                <Text style={styles.Title}> Hello Admin! </Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Assign')} ><Text style={styles.text}>Assign MP</Text></TouchableOpacity>
            </View>    
        )
    }

    //if the view is mp
    if(role == 'Nurse' || role == 'Doctor'){
        return (
            <View>
                <Text style={styles.Title}> Hello MP! </Text>
                <TouchableOpacity onPress={() => toggleModal(MP)} ><Text>Add Device Data</Text></TouchableOpacity>
                <Modal isVisible={isShowing} style={styles1.modalView} >
                    <View>
                        {renderModalContent(type)}
                    </View>
                </Modal>
            </View>    
        )
    }

    //if the view is patient
    if(role == 'Patient'){
        return (
            <View>
                <Text style={styles.Title}> Hello Patient! </Text>
                <TouchableOpacity onPress={() => toggleModal(PATIENT)} ><Text>Add Device Data</Text></TouchableOpacity>
                <Modal isVisible={isShowing} style={styles1.modalView} >
                    <View>
                        {renderModalContent(type)}
                    </View>
                </Modal>
            </View>    
        )
    }

    //for testing purposes
    return (
        <View>
            <Text style={styles.Title}> Hello No role! </Text>
            <TouchableOpacity onPress={() => toggleModal(PATIENT)} ><Text>Add Device Data</Text></TouchableOpacity>
            <Modal isVisible={isShowing} style={styles.modalView} >
                    <View>
                        {renderModalContent(type)}
                    </View>
                </Modal>
        </View>    
    )
    
  
}