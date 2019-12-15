import React, { useState, useEffect } from 'react'
import { withNavigation } from 'react-navigation'

import {
  View,
  Text,
  Image
} from 'react-native'

const Waiting = (props) => {
  const [loading, setLoading] = useState('Please Wait...')
  const [count, setCount] = useState(0)

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
      <Text
        style={{
          fontSize: 18,
          marginTop: 20,
          fontWeight: '600'
        }}
      >{loading}</Text>
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

export default withNavigation(Waiting)