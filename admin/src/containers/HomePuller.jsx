import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import { useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import MapView, { Marker } from 'react-native-maps'

import { 
  View, 
  Text,
  Dimensions,
  AsyncStorage,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  Alert
} from 'react-native';

const FETCH_TRASH = gql`
  query($token: String) {
    AllTrash(token: $token) {
      _id
      location {
        latitude
        longitude
      }
      avaible
    }
  }
`

export default (props) => {
  const [loaction, setLocation] = useState({})
  const [token, setToken] = useState('')
  const [destination, setDestination] = useState({})
  
  const permissionNotif = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    console.log(123)
    let finalStatus = existingStatus
    if(finalStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    console.log(234)
    console.log(finalStatus)
    let token = await Notifications.getExpoPushTokenAsync();
    console.log(token, 'token')
  }

  const logout = () => {
    Alert.alert(
      'Logout',
      'Are you sure?',
      [
        {text: 'Cancel'},
        {text: 'Logout', onPress: async () => {
          await AsyncStorage.removeItem('token')
          props.navigation.navigate('Signin')
        }},
      ],
    );
  }

  const AllMarker = () => {
    if(trashes.data){
      return (
        trashes.data.AllTrash.map(trash => (
          <Marker
            key={trash._id}
            coordinate={{
              latitude: Number(trash.location.latitude),
              longitude: Number(trash.location.longitude)
            }}
            // onPress={() => navigation.navigate('Detail')}
            onPress={() => setDestination({
              latitude: Number(trash.location.latitude),
              longitude: Number(trash.location.longitude)
            })}
          >
            <View>
              {
                trash.avaible
                ? (
                  <Image 
                    source={require('../../assets/trueTrash.png')}
                    style={{
                      width: 20,
                      height: 40
                    }}
                  />
                )
                : (
                  <Image 
                    source={require('../../assets/falsetrash.png')}
                    style={{
                      width: 20,
                      height: 40
                    }}
                  />
                )
              }
            </View>
          </Marker>
        ))
      )
    }
    else{
      return(
        <Marker
          coordinate={{
            latitude: -6.2607917,
            longitude: 106.7810557
          }}
          // onPress={() => navigation.navigate('Detail')}
          onPress={() => setDestination({
            latitude: -6.2607917,
            longitude: 106.7810557
          })}
        >
          <View>
            
            <Image 
              source={require('../../assets/trueTrash.png')}
              style={{
                width: 20,
                height: 40
              }}
            />
              
          </View>
        </Marker>
      )
    }
  }

  const [fetchTrashes, trashes] = useLazyQuery(FETCH_TRASH, {
    variables: {
      token
    }
  })

  const permission = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if(status == 'granted') {
      let { coords } = await Location.getCurrentPositionAsync({});
      setLocation( coords );
    }
  }

  const getToken = async () => {
    const token = await AsyncStorage.getItem('token')
    setToken(token)
    fetchTrashes()
  }

  useEffect(() => {
    permission()
    permissionNotif()
    getToken()
  }, [])

  return (
    <View>
      <MapView style={{
        width: Dimensions.get('window').width,
        height: '100%'
      }} 
        camera={{
          center: {
            // latitude: location ? location.latitude : -6.2607917,
            // longitude: location ? location.longitude : 106.7810557
            latitude: -6.2607917,
            longitude: 106.7810557
          },
          pitch: 0,
          heading: 0,
          altitude: 12000,
          zoom: 14
        }}
      >
        <AllMarker />
      </MapView>
      <SafeAreaView
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0
        }}
      >
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            logout()
          }}
          style={{
            backgroundColor: '#31B057',
            borderRadius: 8,
            padding: 8
          }}
        >
          <FontAwesome5 name="sign-out-alt" style={{ fontSize: 18, color: 'white' }} />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  )
}