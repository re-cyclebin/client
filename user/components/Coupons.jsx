import React from 'react'

import {
  TouchableOpacity,
  View,
  Text,
  Image
} from 'react-native'

import {
  LinearGradient
} from 'expo-linear-gradient'

const Coupons = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={{
        marginBottom: 20
      }}
    >
      <LinearGradient
        colors={[props.color.first, props.color.second]}
        start={[0, 0]}
        end={[2,5]}
        style={{
          height: 130,
          alignItems: 'center', 
          borderRadius: 5,
          position: 'relative',
          justifyContent: 'center'
          }}>
        <Text
          style={{
            backgroundColor: 'transparent',
            fontSize: 24,
            color: '#fff',
            fontWeight: '800'
          }}>
          Reward Rp. 5.000
        </Text>
        <View
          style={{
            justifyContent: 'flex-start',
            position: 'absolute',
            bottom: 10,
            left: 10
          }}
        >
          <Text
            style={{
              color: 'white',
              marginTop: 10
            }}
          >Requirement: 5000 Point</Text>
        </View>
        <Image 
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            height: 40,
            width: 40,
            backgroundColor: 'white',
            borderRadius: 20,
            transform: [
              {
                translateY: -20
              },
              {
                translateX: -20
              }
            ]
          }}
        />
        <Image 
          style={{
            position: 'absolute',
            top: '50%',
            right: 0,
            height: 40,
            width: 40,
            backgroundColor: 'white',
            borderRadius: 20,
            transform: [
              {
                translateY: -20
              },
              {
                translateX: 20
              }
            ]
          }}
        />
      </LinearGradient>
    </TouchableOpacity>
  )
}

export default Coupons