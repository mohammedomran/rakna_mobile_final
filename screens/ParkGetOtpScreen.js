import React from 'react';
import { StyleSheet, View, Text, Button, Image, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
var api_link="http://localhost:8000/api/";

const ParkGetOtpScreen = ({route, navigation}) => {
  var otp = Math.floor(Math.random()*10000);
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@token')
      if(value !== null) {
        // value previously stored
        storeOtp(value);
      }
    } catch(e) {
      // error reading value
    }
  }
  getData();

  const storeOtp = (token) => {
    fetch(api_link+'otp/store', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "api_pass":"UKyu8yu9dfsHN98RM5f4g5e64bhJGFJKF5h6j41k65hj",
        "token":token,
        "otp":otp,
        "place":route.params.place
      })
    }).then((response) => response.json())
    .then((json) => {
      console.log(json);
      /*if(json.code==200) {
        storeData(json.user.token);
        navigation.navigate('dashboard')
      }*/
    });
  };
  
  
  return (
      <View style={styles.homeContainer}>
        <Text style={{ fontWeight:'bold', fontSize:25, marginBottom:50, textAlign:'left', width:'100%' }}>
          This is your OTP 
        </Text>
        <Text style={{ fontWeight:'bold', fontSize:25, marginBottom:50, textAlign:'left', width:'100%' }}>

          {otp}
        </Text>

      </View>
  );
};
 
const styles = StyleSheet.create({
  homeContainer: {
    width:'100%',
    backgroundColor:'#eee',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    margin:'auto',
    paddingVertical:80,
    paddingHorizontal:25
  },
  textCenter: {
    textAlign:'center',
  },
  button: {
    marginHorizontal:'auto',
    backgroundColor:'#fff',
    padding:13,
    color:'#ccc',
    width:'100%',
    textAlign:'center',
    borderRadius:14,
    marginTop:5
  },
  item: {
      backgroundColor:'#fff',
      borderRadius:14,
      width:80,
      height:80,
      padding:5,
      marginVertical:10,
      marginHorizontal:10,
      display:'flex',
      justifyContent:'center',
      alignItems:'center'
  },
  items: {
      alignItems:'flex-start',

  },
});
 
export default ParkGetOtpScreen;