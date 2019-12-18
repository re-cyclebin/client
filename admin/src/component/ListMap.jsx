import React from 'react'
import { withNavigation } from 'react-navigation'
import MapView, { Marker } from 'react-native-maps';
import moment from 'moment';
import { View, Text, Image, TouchableOpacity } from 'react-native'

const ListMap = (props) => (
  <View
    style={{
      marginTop: 20,
      marginBottom: 20,
      width: '100%',
      alignItems: 'center'
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
              ?
              <Image 
                source={require('../../assets/trueTrash.png')}
                style={{
                  width: 20,
                  height: 40
                }}
              />
              :
              <Image 
                source={require('../../assets/falsetrash.png')}
                style={{
                  width: 20,
                  height: 40
                }}
              />
          }
        </View>
      </Marker>
    </MapView>
    <View
      style={{
        marginTop: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        height: 72,
        width: '80%'
      }}
    >
        <Text
          style={{
            color: '#468847',
            fontWeight: '600',
            marginTop: 5
          }}
        >{ props.trash.avaible ? 'Available' : 'Full' }</Text>
        <View style={{ marginTop: 10 }}>
          <Text>Created At: &nbsp;{ moment(props.trash.createdAt).calendar() }</Text>
          <Text>Updated At: &nbsp;{ moment(props.trash.updatedAt).calendar() }</Text>
        </View>
    </View>

    <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <Text>Height: { props.trash.height } &nbsp; &nbsp; &nbsp;</Text>
        <Text>Weight: { props.trash.weight }</Text>
        </View>
    <TouchableOpacity
      onPress={() => props.deleteTrash()}
      style={{
        marginTop: 10,
        width: 100,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        borderRadius: 20
      }}>
        <Text style={{ fontWeight: 'bold', color: 'white' }}>Delete</Text>
    </TouchableOpacity>
  </View>
)

export default withNavigation(ListMap)