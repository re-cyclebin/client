import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import MapView, { Marker } from 'react-native-maps';

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
    <View style={styles.container}>
      <StatusBar 
        barStyle='dark-content'
      />
      <MapView style={styles.mapStyle} 
        camera={{
          center: {
            latitude: location ? location.latitude : -6.2607917,
            longitude: location ? location.longitude : 106.7810557
          },
          pitch: 0,
          heading: 0,
          altitude: 5000,
          zoom: 14
        }}
      >
        <Marker 
          coordinate={{
            latitude: -6.2607917,
            longitude: 106.7810557
          }}
        >
          <View>
            <Image 
              source={require('../assets/trueTrash.png')}
              style={{
                width: 20,
                height: 40
              }}
            />
          </View>
        </Marker>
        <Marker 
          coordinate={{
            latitude: -6.261861,
            longitude: 106.783890
          }}
        >
          <View>
            <Image 
              source={require('../assets/trueTrash.png')}
              style={{
                width: 20,
                height: 40
              }}
            />
          </View>
        </Marker>
      </MapView>
      <SafeAreaView
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          marginRight: 20,
          marginTop: 20
        }}
      >
        <TouchableOpacity>
          <Text>test</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
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