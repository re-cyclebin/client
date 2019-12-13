import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import MapView, { Marker } from 'react-native-maps';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import MapHome from '../components/MapHome'
import ListHome from '../components/ListHome'

import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
  StatusBar
} from 'react-native'

const Home = (props) => {

  const [location, setLocation] = useState('')
  const [view, setView] = useState('map')

  useEffect(() => {
    permission()
  }, [])

  const permission = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if(status == 'granted') {
      let { coords } = await Location.getCurrentPositionAsync({});
      setLocation( coords );
    }
  }

  return(
    <>
      {
        view == 'map'
        ? (
          <MapHome location={location} />
        )
        : (
          <ListHome location={location}/>
        )
      }
      
      <SafeAreaView
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          marginRight: 20,
          marginTop: Platform.OS == 'android' ? StatusBar.currentHeight + 20 : 20
        }}
      >
        {
          view == 'map'
          ? (
            <TouchableOpacity
              style={{
                padding: 8,
                borderRadius: 8,
                backgroundColor: 'white'
              }}
              activeOpacity={0.6}
              onPress={() => setView('list')}
            >
              <FontAwesome5 
                name={'list-ul'} 
                solid
                style={{
                  fontSize: 17
                }}
              />
            </TouchableOpacity>
          )
          : (
            <TouchableOpacity
              style={{
                padding: 8,
                borderRadius: 8,
                backgroundColor: 'black'
              }}
              activeOpacity={0.6}
              onPress={() => setView('map')}
            >
              <FontAwesome5 
                name={'map'} 
                solid
                style={{
                  fontSize: 17,
                  color: 'white'
                }}
              />
            </TouchableOpacity>
          )
        }
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: '100%'
  },
});

export default Home