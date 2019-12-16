import React from 'react';
import { View, Image } from 'react-native';
import { Marker } from 'react-native-maps';

export default ({ data }) => {
  return (
    <Marker 
      coordinate={{
        longitude: Number(data.location.longitude),
        latitude: Number(data.location.latitude)
      }}
    >
    
    <View>
        {
          (data.avaible)
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
  )
}