import React from 'react'
import { withNavigation } from 'react-navigation'

import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'

const Point = (props) => {
  return(
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100%',
        marginHorizontal: 20
      }}
    >
      <Image 
        source={require('../assets/pointDone1.jpg')}
        style={{
          height: 230,
          resizeMode: 'contain'
        }}
      />
      <View
        style={{
          marginTop: 20,
          alignItems: 'center',
          marginHorizontal: 20
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: '500',
            marginBottom: 20
          }}
        >We are done calculating your point!</Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            textAlign: 'center'
          }}
        >Congratulation!</Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            textAlign: 'center'
          }}
        >
          You got<Text style={{color: '#468847', fontSize: 20, fontWeight: '800'}}> 3200 </Text>Point from your bottle!
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('tabNav')}
        activeOpacity={0.6}
        style={{
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 9,
          backgroundColor: '#31B057',
          marginTop: 20,
          width: '100%',
          alignItems: 'center'
        }}
      >
        <Text
          style={{
            color: 'white',
            fontWeight: '600',
            fontSize: 18
          }}
        >Back to home</Text>
      </TouchableOpacity>
    </View>
  )
}

export default withNavigation(Point)