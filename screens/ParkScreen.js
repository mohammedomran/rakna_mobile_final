import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View, Text, Button, Image, TouchableOpacity, FlatList } from 'react-native';
import * as firebase from 'firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';



const ParkScreen = ({navigation}) => {
  var token="";
  var isParkingAvailable = 0;
  var [items, changeItems]=useState([]);
  function getPlaces() {
    firebase.database().ref('places/').on('value', (snapshot) => {
      let x =[], y=snapshot.val();
      let i=1;
      for (let key in y) {
        if(y[key]) {
          x.push({id:i, goTo:"profile", image:"https://i.imgur.com/XG9S9Ec.png", title:"park "+i, bg:"red", status:y[key]});
        } else {
          x.push({id:i, goTo:"profile", image:"https://i.imgur.com/QtITIij.png", title:"park "+i, bg:"green", status:y[key]});
        }
        i++;
      }
      changeItems(x);
    });
  }
  useFocusEffect(
    React.useCallback(() => {
      getPlaces();
      return () => {};
    }, [])
  );

    const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@token')
      if(value !== null) {
        // value previously stored
        isParkingAvailableForMe(value);
        token=value;
      }
    } catch(e) {
      // error reading value
    }
  }
  getData();

  const isParkingAvailableForMe = (token) => {
    console.log(token)
    fetch('http://localhost:8000/api/otp/isotpavailable', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "api_pass":"UKyu8yu9dfsHN98RM5f4g5e64bhJGFJKF5h6j41k65hj",
        "token":token,
      })
    }).then((response) => response.json())
    .then((json) => {
      if(json.code==200) {
        isParkingAvailable=1;
      }
      
    });
  };

  const selectPark = (id, status) => {
    if(!status && isParkingAvailable) {
      firebase.database()
      .ref('places/')
      .update({
        [id]:1
      });
      navigation.navigate('parkgetotp', {"place":id});
    }
  }


  //var [items, setItems] = useState([]);

  /*setItems(
  [     
        {id:Math.random().toString(), title:"profile", image:"https://i.imgur.com/Mk6hwuj.png", goTo:"profile"},
        {id:Math.random().toString(), title:"profile", image:"https://i.imgur.com/Mk6hwuj.png", goTo:"profile"},
        {id:Math.random().toString(), title:"profile", image:"https://i.imgur.com/Mk6hwuj.png", goTo:"profile"},
        {id:Math.random().toString(), title:"profile", image:"https://i.imgur.com/Mk6hwuj.png", goTo:"profile"},
  ]);*/


  
  
  //console.log(values);
  /*for (var i = 0; i < values.length; i++) {
    if(values[i]==0) {
      console.log("no")
    }else {
      console.log("yes")
    }
  }*/


  return (
      <View style={styles.homeContainer}>
        <Text style={{ fontWeight:'bold', fontSize:21, marginBottom:50, textAlign:'left', width:'100%' }}>Select your park now</Text>

        <FlatList
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.items}
        numColumns={3}
        data={items}
        renderItem={(item) =>
            <TouchableOpacity style={styles.item}
              onPress={()=>selectPark(item.item.id, item.item.status)}
            >
                <Image
                source={{uri: item.item.image}}
                style={{ width: 40, height: 40, marginHorizontal:'auto' }}
                />
                <Text style={styles.textCenter}>{item.item.title}</Text>
            </TouchableOpacity>
        }
      />  

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
  red:{
    backgroundColor:"red"
  },
  green:{
    backgroundColor:"green"
  },
  items: {
      alignItems:'flex-start',

  },
});
 
export default ParkScreen;