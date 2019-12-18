import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { View, Text, AsyncStorage, TouchableOpacity } from 'react-native';
import { GET_ALL_HISTORY } from '../graphAction/query';
import { MUTATION_DELETE_HISTORY } from '../graphAction/mutation';
import { ErrorComponent, LoadingComponent, EmptyComponent } from '../component/SpamComponent';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import moment from 'moment'

export default () => {
  const [ token, setToken ] = useState('');
  const [ fetchHistory, { data, loading, error } ] = useLazyQuery(GET_ALL_HISTORY, { variables: { token } });
  const [ submitDelete ] = useMutation( MUTATION_DELETE_HISTORY );

  useEffect(() => {
    const getToken = async () => {
      const tempToken = await AsyncStorage.getItem('token');
      setToken(tempToken);
      fetchHistory()
    }
    getToken()
  }, [])

  const deleteAction = (id) => {
    submitDelete({
      variables: { token, id },
      update (cache) {
        const { showAllHistory } = cache.readQuery({ query: GET_ALL_HISTORY, variables: { token } })
        let temp = [];
        showAllHistory.forEach((el, i) => {
          if(el._id !== id) temp.push(el)
        })
        cache.writeQuery({
          query: GET_ALL_HISTORY,
          variables: { token },
          data: { showAllHistory: temp }
        })
      }
    })
  }

  const deleteHistoryy = (id) => {
    Alert.alert(
      'History',
      'Are you sure?',
      [
        { text: 'NO', onPress: () => console.log('cancel') },
        { text: 'YES', onPress: () => deleteAction(id) }
      ]
    )
  }

  if(loading) return <LoadingComponent />
  if(error) return <ErrorComponent />

    return (
      data
        ?
        <View style={{ marginTop: 50, marginHorizontal: 20 }}>
          <SwipeListView
              data={data.showAllHistory}
              disableRightSwipe={true}
              closeOnRowOpen={true}
              stopLeftSwipe={35}
              closeOnRowBeginSwipe={true}
              renderItem={data => (
                <View
                  key={data.item._id}
                  activeOpacity={0.6}
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
                    >Height: {data.item.height}</Text>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '500'
                      }}
                    >Weight: {data.item.weight}</Text>
                    <Text
                      style={{
                        marginTop: 10
                      }}
                    >{ moment(data.item.createdAt).calendar() }</Text>
                    <Text style={{ marginTop: 5 }}>
                      Puller ID : {data.item.Puller._id}
                    </Text>
                  </View>
                </View>
              )}
              renderHiddenItem={data => (
                <TouchableOpacity
                  key={data.item._id}
                  style={{
                    flexDirection: 'row-reverse',
                    alignItems: 'center',
                    marginTop: 20,
                    marginLeft: 20
                  }}
                  onPress={() => deleteHistoryy(data.item._id)}
                >
                  <FontAwesome5 name={'trash-alt'} style={{ fontSize: 20, color: 'red'}}/>
                </TouchableOpacity>
              )}
              leftOpenValue={75}
              rightOpenValue={-75}
              />
        </View>
          : null
    )
}