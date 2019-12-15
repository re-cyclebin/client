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
          marginTop: 15,
          alignItems: 'center'
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
              borderRadius: 5,
              alignItems: 'center',
              width: '100%'
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: '600'
              }}
            >I'm done adding trash</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default withNavigation(ProcessAdd)