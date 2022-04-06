import React, {Component} from 'react';
import { SafeAreaView, TouchableOpacity, View, Text, TextInput, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import styles from '../styles/style';

//This view will change depending on the usre's role (patient or MP)
export default function HomeScreen() {


    return (
        
        <Text style={styles.Title}> Hello User! </Text>
    )
  
}