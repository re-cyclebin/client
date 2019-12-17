import React, { useEffect, useState } from 'react'
import { withNavigation } from 'react-navigation'
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import MapView, { Marker } from 'react-native-maps';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  AsyncStorage,
  ActivityIndicator
} from 'react-native'

const FETCH_ONE = gql`
  query($token: String, $id: String) {
    TrashId(token: $token, id: $id) {
      _id
      location{
        latitude
        longitude
      }
      status
      avaible
    }
  }
`

const OPEN_TRASH = gql`
  mutation($token: String, $id: String) {
    userOpen(token: $token, id: $id) {
      _id
      height
      weight
    }
  }
`

const ConfirmationAddTrash = (props) => {
  useEffect(() => {
    asyncStorage()
  }, [])

  const [token, setToken] = useState('')
  const [errorTrash, setErrorTrash] = useState('')
  const [loadingTrash, setLoadingTrash] = useState(false)

  const asyncStorage = async () => {
    const token = await AsyncStorage.getItem('token')
    setToken(token)
    fetchTrash()
    // console.log(data, 'data')
  }

  const [fetchTrash, { data, loading, error }] = useLazyQuery(FETCH_ONE, {
    variables: {
      token,
      id: props.navigation.state.params.data
    },
    fetchPolicy: 'network-only'
  })

  const [openTrash] = useMutation(OPEN_TRASH)

  return(
    <View
      style={{
        minHeight: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {
        !error
        ? (
          data
          && (
            data.TrashId
            ? (
              <>
              <MapView
                style={{
                  height: 200,
                  marginHorizontal: 20,
                  borderWidth: 0.5,
                  borderColor: '#a2a7aa',
                  width: '100%'
                }}
                camera={{
                  center: {
                    latitude: Number(data.TrashId.location.latitude),
                    longitude: Number(data.TrashId.location.longitude)
                  },
                  pitch: 0,
                  heading: 0,
                  altitude: 600,
                  zoom: 14
                }}
              >
                <Marker 
                  coordinate={{
                    latitude: Number(data.TrashId.location.latitude),
                    longitude: Number(data.TrashId.location.longitude)
                  }}
                >
                  <View>
                    <Image 
                      source={require('../assets/trueTrash.png')}
                      style={{
                        width: 20,
                        height: 40
                      }}
                    />
                  </View>
                </Marker>
              </MapView>
              <View
                style={{
                  marginHorizontal: 20,
                  marginTop: 20,
                  marginBottom: 30,
                  alignItems: 'center'
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '600',
                  }}
                >Hey, are you sure this is the location?</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: 30,
                    alignItems: 'center'
                    
                  }}
                >
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      flex:1
                    }}
                  >
                    {
                      !loadingTrash
                      ? (
                        <TouchableOpacity
                          style={{
                            backgroundColor: '#31B057',
                            borderRadius: 8,
                            paddingVertical: 10,
                            paddingHorizontal: 15
                          }}
                          onPress={ async () => {
                            try{
                              if(data.TrashId.avaible) {
                                if(data.TrashId.status){
                                  setErrorTrash('Sorry, trashbin still in use. Try again later.')
                                  setTimeout(() => {
                                    setErrorTrash('')
                                  }, 2000)
                                }
                                else{
                                  const { data: dataTrash } = await openTrash({variables: {
                                    token,
                                    id: data.TrashId._id
                                  }})
                                  props.navigation.navigate('ProcessAdd', {
                                    oldTrash: dataTrash.userOpen,
                                    token
                                  })
                                }
                              }
                              else{
                                setErrorTrash('Trashbin is full, please use other trashbin')
                                setTimeout(() => {
                                  setErrorTrash('')
                                }, 2000)
                              }
                            }
                            catch(err) {
                              console.log(err)
                            }
                          }}
                        >
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 16,
                              fontWeight: '600'
                            }}
                          >Yes!</Text>
                        </TouchableOpacity>
                      )
                      : (
                        <View
                          style={{
                            backgroundColor: '#31B057',
                            borderRadius: 8,
                            paddingVertical: 10,
                            paddingHorizontal: 15
                          }}
                        >
                          <ActivityIndicator style={{color: 'white'}} />
                        </View>
                      )
                    }
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        padding: 10
                      }}
                      onPress={() => props.navigation.navigate('Add')}
                    >
                      <Text
                        style={{
                          padding: 5
                        }}
                      >I don't think so</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    marginBottom: Platform.OS === 'android' ? 150 : 0,
                    marginTop: 30
                  }}
                >
                  <Text
                    style={{
                      color: 'red',
                      fontSize: 18,
                      fontWeight: '600'
                    }}
                  >{errorTrash}</Text>
                </View>
              </View>
              </>
            )
            : (
              <>
              <Image 
                style={{
                  height: 240,
                  resizeMode: 'contain',
                }}
                source={require('../assets/sad.jpg')}
              />
              <Text
                style={{
                  marginHorizontal: 20,
                  fontSize: 18,
                  textAlign: 'center',
                  fontWeight: '700',
                  marginTop: 20
                }}
              >Sorry, the trashcan you looking for were already deleted.</Text>
              <View
                style={{
                  marginBottom: Platform.OS == 'android' ? 210 : 0
                }}
              ></View>
              </>
            )
          )
        )
        : (
          <>
            <Image
              style={{
                height: 300,
                resizeMode: 'contain'
              }}
              source={require('../assets/notfound.png')}
            />
            <Text
              style={{
                marginBottom: Platform.OS === 'android' ? 230 : 0,
                marginHorizontal: 20,
                textAlign: 'center',
                fontSize: 18,
                fontWeight: '600'
              }}
            >Sorry, trashcan with id {JSON.stringify(props.navigation.state.params.data)} is not found.</Text>
          </>
        )
      }
      
    </View>
  )
}

export default withNavigation(ConfirmationAddTrash)