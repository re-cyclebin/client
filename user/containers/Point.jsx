import React, { useEffect, useState } from 'react'
import { withNavigation } from 'react-navigation'
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import axios from 'axios'
import db from '../configs/firebase'

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'

const FETCH_TRASH = gql`
  query($token: String, $id: String) {
    TrashId(token: $token, id: $id) {
      _id
      location{
        latitude
        longitude
      }
      status
      avaible
      weight
      height
    }
  }
`

const POST_POINT = gql`
  mutation($token: String, $point:Int) {
    postPoint(token: $token, point: $point) {
      point
    }
  }
`

const Point = (props) => {
  const [point, setPoint] = useState(0)
  const {data, loading} = useQuery(FETCH_TRASH, {
    variables: {
      token: props.navigation.state.params.token,
      // id: '5df9af8d84f4493b516329c0'
      id:  props.navigation.state.params.id
    },
    fetchPolicy: 'network-only'
  })
  const [postPoint] = useMutation(POST_POINT)

  console.log('================', data)

  useEffect(() => {
    if(data){
      console.log(data, '==============')
      const point1 = data.TrashId.weight - props.navigation.state.params.weight
      setPoint(point1)
      console.log(point1)
      postPoint({
        variables: {
          token: props.navigation.state.params.token,
          point: point1
        }
      })
      if(data.TrashId.height < 11) {
        async function getNotif() {
          const arrData = await db.collection('tokenDevice').get()
          for(let i = 0; i < arrData.length; i++) {
            axios({
              url: 'https://exp.host/--/api/v2/push/send',
              method: 'POST',
              data: {
                "to": arrData[i].data().token,
                "title": "hello",
                "body": "world"
              }
            })
          }
        }
        getNotif()
      }
    }
  }, [data])
  
  // const getTrashFn = async () => {
  //   // console.log(props.navigation.state.params.token)
  //   const data = await getTrash({
  //     variables: {
  //       token: props.navigation.state.params.token,
  //       // id: '5df9af8d84f4493b516329c0'
  //       id: '5df87d05fb3d617f1f44b67d'
  //     }
  //   })
  //   console.log(data, 'data')
  // }

  // useEffect(() => {
  //   getTrashFn()
  // }, [])

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
        > You got {
          data
          ? (
            <Text style={{color: '#468847', fontSize: 20, fontWeight: '800'}}>
              {point} 
            </Text>
          )
          : (
            <Text>loading...</Text>
          )
        } Point from your bottle!
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