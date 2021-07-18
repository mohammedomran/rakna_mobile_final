import React from 'react';
import { StyleSheet, View, Text, Button, Image, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as firebase from 'firebase';

const LeaveEnterOtpScreen = ({navigation}) => {
  var otp;
  const checkOtp = () => {

    firebase.database().ref('servos/').set({
      "1":1,
    });

    fetch('http://localhost:8000/api/otp/check', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "api_pass":"UKyu8yu9dfsHN98RM5f4g5e64bhJGFJKF5h6j41k65hj",
        "otp":otp
      })
    }).then((response) => response.json())
    .then((json) => {
      if(json.code==200) {
        firebase.database().ref('places/').update({
          [json.otp.place]:0
        });
      }
      navigation.navigate('leavecorrectotp')
    });
  };

  return (
      <View style={styles.homeContainer}>
        <Text style={styles.textWhite}>
          Hi, enter your OTP and we will open the gate for you.
        </Text>
        <TextInput
        placeholder='name'
        style={styles.input}
        placeholder='ex: 1234'
        onChangeText={(val)=>{otp=val}}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={()=>{checkOtp()}}
        >
          <Text style={{fontWeight:'bold', textAlign:'center', color:'#fff'}}>NEXT</Text>
        </TouchableOpacity>
      </View>
  );
};
 
const styles = StyleSheet.create({
  homeContainer: {
    width:'100%',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    margin:'auto',
    paddingVertical:30,
    paddingHorizontal:25,
    backgroundColor:'#eee',
  },
  textWhite: {
    color:'#1d1d1d',
    marginBottom:20,
  },
  input: {
    marginBottom:8,
    backgroundColor:'#fff',
    padding:13,
    color:'#1d1d1d',
    width:'100%',
    textAlign:'left',
    borderRadius:14
  },
  button: {
    marginHorizontal:'auto',
    backgroundColor:'#0076de',
    padding:18,
    color:'#ccc',
    width:'100%',
    borderRadius:14,
    marginTop:5,
  }
});
 
export default LeaveEnterOtpScreen;