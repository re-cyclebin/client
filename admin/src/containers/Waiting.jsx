import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator
} from 'react-native'

const CREATE_HISTORY = gql`
  mutation($token: String, $id: String) {
    createHistory(token: $token, id: $id) {
      weight
      height
      createdAt
    }
  }
`;

const Waiting = (props) => {
  const [token, setToken] = useState('')

  const [createHistory, { loading }] = useMutation(CREATE_HISTORY)

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem('token')
      setToken(token)
    }
    getToken()
  }, [])

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
      
        {
          !loading
          ? (
            <>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={ async () => {
                const { data: dataCreate } = await createHistory({
                  variables: {
                    token,
                    id: '5df87d05fb3d617f1f44b67d'
                  }
                })
                
                props.navigation.navigate('tabNavPuller')
              }}
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
            </>
          )
          : (
            <View
              style={{
                backgroundColor: '#31B057',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 10,
                borderRadius: 8,
                marginTop: 30,
                opacity: 0.6
              }}
            >
              <ActivityIndicator color="white" />
            </View>
          )
        }
    </View>
  )
}

export default Waiting