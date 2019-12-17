import React, { useEffect, useState } from 'react'

import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'

const Waiting = (props) => {
  return(
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%',
        paddingBottom: 80,
        marginHorizontal: 20
      }}
    >
      <Image 
        source={require('../../assets/janitor.jpg')}
        style={{
          height: 400,
          resizeMode: 'contain'
        }}
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: '600'
        }}
      >You can empty the trashcan!</Text>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => props.navigation.navigate('tabNavPuller')}
        style={{
          backgroundColor: '#31B057',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 10,
          borderRadius: 8,
          marginTop: 30
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 16,
            fontWeight: '700'
          }}
        >I'm done</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Waiting