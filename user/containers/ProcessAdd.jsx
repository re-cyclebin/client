import React, { useState, useEffect } from 'react'
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'

const OPEN_TRASH = gql`
  mutation($token: String, $id: String) {
    userOpen(token: $token, id: $id) {
      _id
      height
      weight
    }
  }
`

const ProcessAdd = (props) => {
  const [openTrash] = useMutation(OPEN_TRASH)

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
            onPress={ async () => {
              console.log(props.navigation.state.params)
              const { data: dataTrash } = await openTrash({variables: {
                token: props.navigation.state.params.token,
                id: props.navigation.state.params.oldTrash._id
              }})
              console.log(dataTrash.userOpen)
              console.log(props.navigation.state.params.oldTrash)
              props.navigation.navigate('Waiting', {
                oldTrash: props.navigation.state.params.oldTrash, 
                newTrash: dataTrash.userOpen
              })
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

export default ProcessAdd