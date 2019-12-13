import React, { useState } from 'react'
import MapViewDirections from 'react-native-maps-directions';
import { withNavigation } from 'react-navigation'

import MapView, { Marker } from 'react-native-maps';

const GOOGLE_MAPS_APIKEY = 'AIzaSyDj8ftMy8ui6OG3awnbw2hDGN_Yjamadmo';

import {
  View,
  SafeAreaView,
  Text,
  Image,
  Platform,
  StatusBar,
  ScrollView
} from 'react-native'

const ListMap = (props) => {
  const [ distance, setDistance ] = useState('-')
  const [ duration, setDuration ] = useState('-')

  return(
    <View
      style={{
        marginTop: 20
      }}
    >
      <MapView
        style={{
          width: '100%',
          height: 200
        }}
        camera={{
          center: {
            latitude: -6.261861,
            longitude: 106.783890
          },
          pitch: 0,
          heading: 0,
          altitude: 1500,
          zoom: 14
        }}
      >
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
        {/* <MapViewDirections 
          origin={{
            latitude: props.location.latitude ? props.location.latitude : -6.2607917,
            longitude: props.location.longitude ? props.location.longitude : 106.7810557
          }}
          destination={{
            latitude: -6.261861,
            longitude: 106.783890
          }}
          apikey={GOOGLE_MAPS_APIKEY}
          onReady={result => {
            setDistance(result.distance)
            setDuration(Math.ceil(result.duration))
            console.log(result.distance)
            console.log(result.duration)
          }}
        /> */}
      </MapView>
      <View
        style={{
          marginTop: 10
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <View
            style={{
              backgroundColor: '#468847',
              padding: 6,
              borderRadius: 5
            }}
          >
            <Text
              style={{
                color: 'white',
                fontWeight: '600'
              }}
            >Availavble</Text>
          </View>
          <Text
            style={{
              marginLeft: 10
            }}
          >
            {distance} Km 
          </Text>
          <Text
            style={{
              marginLeft: 10
            }}
          >
            {duration} Min
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 10
        }}
      >
        <Text>Test</Text>
      </View>
    </View>
  )
}

export default withNavigation(ListMap)