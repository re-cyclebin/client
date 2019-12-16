import React from 'react';
import { View, Image } from 'react-native';
import { Marker } from 'react-native-maps'

export default (props) => {
  return (
    <View>
      <Marker draggable
        // onDragStart={(e) => console.log(e)}
        coordinate={{
          longitude: Number(props.data.location.longitude),
          latitude: Number(props.data.location.latitude)
        }}
        onDragEnd={({ nativeEvent }) => props.updateLocation(nativeEvent, props.data._id, props.data.location)}
        onPress={() => props.deleteTrashId(props.data._id)}
      >
        <View>
          {
            (props.data.avaible)
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
    </View>
  )
}