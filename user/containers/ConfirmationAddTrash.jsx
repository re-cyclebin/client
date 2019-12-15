import React from 'react'
import { withNavigation } from 'react-navigation'

import MapView, { Marker } from 'react-native-maps';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform
} from 'react-native'

const ConfirmationAddTrash = (props) => {
  return(
    <View
      style={{
        minHeight: '100%',
        justifyContent: 'center'
      }}
    >
      <MapView
        style={{
          height: 200,
          marginHorizontal: 20,
          borderWidth: 0.5,
          borderColor: '#a2a7aa',
        }}
        camera={{
          center: {
            latitude: -6.261861,
            longitude: 106.783890
          },
          pitch: 0,
          heading: 0,
          altitude: 600,
          zoom: 14
        }}
      >
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
      <View
        style={{
          marginHorizontal: 20,
          marginTop: 20,
          marginBottom: 30,
          alignItems: 'center'
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
          }}
        >Hey, are you sure this is the location?</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 30,
            alignItems: 'center',
            marginBottom: Platform.OS === 'android' ? 140 : 0
          }}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex:1
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: '#31B057',
                borderRadius: 8,
                paddingVertical: 10,
                paddingHorizontal: 15
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: '600'
                }}
              >Yes!</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <TouchableOpacity
              style={{
                padding: 10
              }}
            >
              <Text
                style={{
                  padding: 5
                }}
              >I don't think so</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

export default withNavigation(ConfirmationAddTrash)