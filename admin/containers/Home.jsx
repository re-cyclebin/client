import React from 'react'

import MapView, { Marker } from 'react-native-maps';

import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Platform,
  StatusBar,
  Image
} from 'react-native'

const Home = (props) => {
  return(
    <View>
      <MapView style={styles.mapStyle} 
        camera={{
          center: {
            // latitude: location ? location.latitude : -6.2607917,
            // longitude: location ? location.longitude : 106.7810557
            latitude: -6.2607917,
            longitude: 106.7810557
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
          // onPress={() => props.navigation.navigate('Detail')}
          // onPress={() => setDestination({
          //   latitude: -6.2607917,
          //   longitude: 106.7810557
          // })}
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
        {/* <MapViewDirections
          origin={{
            latitude: -6.2607917,
            longitude: 106.7810557
          }}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="#3997F0"
        /> */}
      </MapView>
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