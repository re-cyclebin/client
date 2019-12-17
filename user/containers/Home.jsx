import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

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
  StatusBar,
  AsyncStorage
} from 'react-native'

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

const Home = (props) => {

  const [location, setLocation] = useState('')
  const [view, setView] = useState('map')
  const [token , setToken] = useState('')
  const [fetchTrashes, trashes] = useLazyQuery(FETCH_TRASH, {
    variables: {
      token
    }
  })

  const asyncStorage = async () => {
    const token = await AsyncStorage.getItem('token')
    setToken(token)
    await fetchTrashes()
  }

  useEffect(() => {
    permission()
    asyncStorage()
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
          trashes.data
          ? <MapHome location={location} trashes={trashes} />
          : <Text>test</Text>
        )
        : (
          <ListHome location={location} trashes={trashes} />
        )
      }
      
      <SafeAreaView
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          marginRight: 20,
          paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight + 20 : 20
        }}
      >
        {
          view == 'map'
          ? (
            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 8,
                backgroundColor: '#30b057'
              }}
              activeOpacity={0.6}
              onPress={() => setView('list')}
            >
              <FontAwesome5 
                name={'list-ul'} 
                solid
                style={{
                  fontSize: 18,
                  color: 'white'
                }}
              />
            </TouchableOpacity>
          )
          : (
            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 8,
                backgroundColor: '#30b057'
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