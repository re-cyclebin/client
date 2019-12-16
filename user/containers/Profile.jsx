import React, { useState, useEffect } from 'react'
import { SwipeListView } from 'react-native-swipe-list-view';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import moment from "moment";

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {
  View,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator
} from 'react-native'

const GET_HISTORY = gql`
  query($token: String) {
    UserHistory(token: $token) {
      _id
      point
      UserId
      createdAt
    }
  }
`

const Profile = (props) => {
  const [list, setList] = useState([1,2,3,4,5,6,7,8,9])
  const [token, setToken] = useState('')
  const [point, setPoint] = useState(0)
  const [reward, setReward] = useState(0)
  const [getHistories, { data }] = useLazyQuery(GET_HISTORY, {
    variables: {
      token
    }
  })

  const getToken = async () => {
    const token = await AsyncStorage.getItem('token')
    setToken(token)
    getHistories()
  }
  
  useEffect(() => {
    getToken()
  }, [])

  return(
    <ScrollView
    showsVerticalScrollIndicator={false}
      style={{
        paddingTop: 10,
        marginHorizontal: 20
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Image 
          source={{ uri: 'https://pbs.twimg.com/profile_images/980145664712740864/aNWjR7MB_400x400.jpg' }}
          style={{
            borderRadius: 100000,
            width: 120,
            height: 120,
            borderWidth: 0.5,
            borderColor: '#a2a7aa',
            marginRight: 20,
            marginLeft: 10
          }}
        />
        <View
          style={{
            marginLeft: 20,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row'
          }}
        >
         
            {
              data
              ? (
                <>
                <View
                  style={{
                    alignItems: 'center',
                    marginRight: 20
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                    }}
                  >{point}</Text>
                  <Text
                    style={{
                      fontSize: 18,
                    }}
                  >Point</Text>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    marginLeft: 20
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                    }}
                  >{reward}</Text>
                  <Text
                    style={{
                      fontSize: 18,
                    }}
                  >Reward</Text>
                </View>
                </>
              )
              : (
                <ActivityIndicator />
              )
            }
        </View>
      </View>
      <View
        style={{
          paddingTop: 50
        }}
      >
        <View
          style={{
            alignItems: 'center',
            borderTopWidth: 0.5,
            borderTopColor: '#a2a7aa',
            paddingTop: 20,
          }}
        >
          <FontAwesome5 name={'clock'} style={{ fontSize: 20}}/>
          <Text
            style={{
              fontSize: 12
            }}
          >History</Text>
        </View>
      </View>
      {/* <View
        style={{
          marginTop: 20
        }}
      >
        {
          list.map(item => (
            <TouchableOpacity
            activeOpacity={0.6}
              key={item}
              style={{
                marginBottom: 20,
                flexDirection: 'row',
                alignItems: 'flex-start',
                paddingBottom: 20,
                borderBottomWidth: 0.5,
                borderColor: '#a2a7aa'
              }}
            >
              <View
                style={{
                  backgroundColor: '#31B057',
                  padding: 9,
                  borderRadius: 18,
                  marginRight: 15
                }}
              >
                <FontAwesome5 name={'leaf'} style={{ fontSize: 25 }}/>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '500'
                  }}
                >Point: 2000</Text>
                <Text
                  style={{
                    marginTop: 10
                  }}
                >20 Des 2019</Text>
              </View>
            </TouchableOpacity>
          ))
        }
      </View> */}
      {
        data
        ? (
          <SwipeListView
          style={{
            marginTop: 20
          }}
          data={data.UserHistory}
          disableRightSwipe={true}
          closeOnRowOpen={true}
          stopLeftSwipe={35}
          closeOnRowBeginSwipe={true}
          renderItem={ (data, rowMap) => (
            <View
              key={data.item._id}
              style={{
                marginBottom: 20,
                flexDirection: 'row',
                alignItems: 'flex-start',
                paddingBottom: 20,
                borderBottomWidth: 0.5,
                borderColor: '#a2a7aa',
                backgroundColor: 'white'
              }}
            >
              <View
                style={{
                  backgroundColor: '#31B057',
                  padding: 9,
                  borderRadius: 18,
                  marginRight: 15
                }}
              >
                <FontAwesome5 name={'leaf'} style={{ fontSize: 25 }}/>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '500'
                  }}
                >Point: {data.item.point}</Text>
                <Text
                  style={{
                    marginTop: 10
                  }}
              >{moment(data.item.createdAt).calendar()}</Text>
              </View>
            </View>
          )}
          renderHiddenItem={ (data, rowMap) => (
            <TouchableOpacity
              key={data.item._id}
              style={{
                flexDirection: 'row-reverse',
                alignItems: 'center',
              }}
            >
              <FontAwesome5 name={'trash-alt'} style={{ fontSize: 20, color: 'red'}}/>
            </TouchableOpacity>
          )}
          leftOpenValue={75}
          rightOpenValue={-75}
          />
        )
        : <ActivityIndicator style={{marginTop: 20}} />
      }
      
    </ScrollView>
  )
}

export default Profile