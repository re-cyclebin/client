import React, {useState} from 'react'
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import {
  TouchableOpacity,
  View,
  Text,
  Image
} from 'react-native'

import {
  LinearGradient
} from 'expo-linear-gradient'

const GET_REWARD = gql`
  mutation (
    $getReward: Int, 
    $token: String
  ) {
      reward (getReward: $getReward, token: $token){
        point
        reward
        _id
      }
    }
`

const Coupons = (props) => {
  const [getReward] = useMutation(GET_REWARD)
  const [error, setError] = useState('')

  return (
    <TouchableOpacity
      onPress={ async () => {
        try {
          await getReward({
            variables: {
              token: props.token,
              getReward: props.value
            }
          })
        }
        catch(err) {
          setError(err.graphQLErrors[0].message)
          setTimeout(() => {
            setError('')
          }, 2500)
        }
      }}
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
          Reward Rp. {props.value}
        </Text>
        <View
          style={{
            justifyContent: 'space-between',
            position: 'absolute',
            bottom: 10,
            left: 10,
            alignItems: 'center',
            flexDirection: 'row'
          }}
        >
          <Text
            style={{
              color: 'white',
              marginTop: 10
            }}
          >Requirement: {props.point} Point</Text>
          {
            error
            ? (
              <Text
                style={{
                  marginTop: 10,
                  color: 'red',
                  marginLeft: 25
                }}
              >{error}</Text>
            )
            : (
              <Text></Text>
            )
          }
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