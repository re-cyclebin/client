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
        marginTop: 20,
        marginBottom: 20
      }}
    >
      <MapView
        style={{
          width: '100%',
          height: 200
        }}
        camera={{
          center: {
            latitude: Number(props.trash.location.latitude),
            longitude: Number(props.trash.location.longitude)
          },
          pitch: 0,
          heading: 0,
          altitude: 1500,
          zoom: 15
        }}
      >
        <Marker 
          coordinate={{
            latitude: Number(props.trash.location.latitude),
            longitude: Number(props.trash.location.longitude)
          }}
        >
          <View>
            {
              props.trash.avaible
              ? (
                <Image 
                  source={require('../assets/trueTrash.png')}
                  style={{
                    width: 20,
                    height: 40
                  }}
                />
              )
              : (
                <Image 
                  source={require('../assets/trash.png')}
                  style={{
                    width: 20,
                    height: 40
                  }}
                />
              )
            }
          </View>
        </Marker>
        <MapViewDirections 
          origin={{
            latitude: props.location.latitude ? props.location.latitude : -6.2607917,
            longitude: props.location.longitude ? props.location.longitude : 106.7810557
          }}
          destination={{
            latitude: Number(props.trash.location.latitude),
            longitude: Number(props.trash.location.longitude)
          }}
          apikey={GOOGLE_MAPS_APIKEY}
          onReady={result => {
            setDistance(result.distance)
            setDuration(Math.ceil(result.duration))
          }}
          strokeWidth={3}
          strokeColor="#30b057"
        />
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
          {
            props.trash.avaible
            ? (
              <Text
                style={{
                  color: '#468847',
                  fontWeight: '600'
                }}
              >Available</Text>
            )
            : (
              <Text
                style={{
                  color: '#a2a7aa',
                  fontWeight: '600'
                }}
              >Unavailable</Text>
            )
          }
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
      </View>
    </View>
  )
}

export default withNavigation(ListMap)