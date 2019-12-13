import React from 'react'
import { withNavigation } from 'react-navigation'

import MapView, { Marker } from 'react-native-maps';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

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

const MapHome = (props) => {
  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle='dark-content'
      />
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
          onPress={() => props.navigation.navigate('Detail')}
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
          onPress={() => props.navigation.navigate('Detail')}
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

export default withNavigation(MapHome)