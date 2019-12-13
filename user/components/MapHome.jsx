import React, { useState } from 'react'
import { withNavigation } from 'react-navigation'
import MapViewDirections from 'react-native-maps-directions';

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

const GOOGLE_MAPS_APIKEY = 'AIzaSyDj8ftMy8ui6OG3awnbw2hDGN_Yjamadmo';

const MapHome = (props) => {
  const [loc1, setLoc1] = useState({
    latitude: -6.261861,
    longitude: 106.783890
  })

  const [loc2, setLoc2] = useState({
    latitude: -6.2635541,
    longitude: 106.7807222
  })

  const [destination, setDestination] = useState({})

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
          coordinate={loc2}
          // onPress={() => props.navigation.navigate('Detail')}
          onPress={() => setDestination(loc2)}
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
          coordinate={loc1}
          // onPress={() => props.navigation.navigate('Detail')}
          onPress={() => setDestination(loc1)}
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

export default withNavigation(MapHome)