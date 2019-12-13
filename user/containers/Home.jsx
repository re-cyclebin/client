import React from 'react'

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
  return(
    <SafeAreaView style={styles.container}>
      <MapView style={styles.mapStyle} 
        camera={{
          center: {
            latitude: -6.2607917,
            longitude: 106.7810557
          },
          pitch: 0,
          heading: 0,
          altitude: 10000,
          zoom: 11
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: 300
  },
});

export default Home