import React from 'react'
import { withNavigation } from 'react-navigation'

import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'

const ProcessAdd = (props) => {
  return(
    <View
      style={{
        minHeight: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
      }}
    >
      <Image 
        source={require('../assets/recycle1.jpg')}
        style={{
          height: 290,
          resizeMode: 'contain',
        }}
      />
      <View
        style={{
          marginTop: 15
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: '700'
          }}
        >You can insert your bottle now!</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20
          }}
        >
          <TouchableOpacity
            activeOpacity={0.6}
            style={{
              marginTop: 50,
              backgroundColor: '#31B057',
              paddingVertical: 10,
              paddingHorizontal: 40,
              borderRadius: 8
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: '600'
              }}
            >Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default withNavigation(ProcessAdd)