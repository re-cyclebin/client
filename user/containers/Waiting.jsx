import React, { useState, useEffect } from 'react'
import AnimatedEllipsis from 'react-native-animated-ellipsis';

import {
  View,
  Text,
  Image
} from 'react-native'

const Waiting = (props) => {
  const [loading, setLoading] = useState('Please Wait...')
  const [count, setCount] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('Point')
    }, 2000)
  }, [])
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100%'
      }}
    >
      <Image 
        source={require('../assets/calculate.jpg')}
        style={{
          height: 250,
          resizeMode: 'contain'
        }}
      />
      <View>
        <Text
          style={{
            fontSize: 18,
            marginTop: 20,
            fontWeight: '600'
          }}
        >{loading} </Text>
      </View>
      <Text
        style={{
          marginTop: 10,
          fontSize: 19,
          fontWeight: '600'
        }}
      >We are calculating your point.</Text>
    </View>
  )
}

export default Waiting