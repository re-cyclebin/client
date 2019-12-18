import React, { useState, useEffect } from 'react';
import ListMap from '../component/ListMap'
import { MUTATION_DELETE_LOCATION_ADMIN } from '../graphAction/mutation';
import { GET_ALL_TRASH_FOR_MAP } from '../graphAction/query';
import { useMutation } from '@apollo/react-hooks';

import {
  SafeAreaView,
  Platform,
  StatusBar,
  Alert,AsyncStorage, ImageBackground,
  ScrollView } from 'react-native';

export default ({ navigation }) => {
  const [ token, setToken ] = useState('');
  const [ submitDelete ] = useMutation(MUTATION_DELETE_LOCATION_ADMIN);
  
  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem("token");
      setToken(token)
    }
    getToken();
  }, [])

  const actionDelete = async (id) => {
    await submitDelete({
      variables: { id, token },
      update (cache) {
        const { AllTrash } = cache.readQuery({ query: GET_ALL_TRASH_FOR_MAP, variables: { token } })
        let temp = []
        AllTrash.forEach((trash, i) => {
          if(trash._id !== id) temp.push(trash)
        })
        cache.writeQuery({
          query: GET_ALL_TRASH_FOR_MAP,
          variables: { token },
          data: { AllTrash: temp }
        })
      }
    })
  }
  const deleteTrashId = () => {
    Alert.alert(
      'DELETE',
      'Are you sure want delete?',
      [
        { text: 'NO', onPress: () => alert('safe trash') },
        { text: 'DELETE', onPress: async () => {
          await actionDelete(navigation.state.params.trash._id)
          navigation.navigate('Home')
        }}
      ],
       { cancelable: false }
    )
  }

  return (
    <ImageBackground source={{ uri: 'https://hariannusantara.com/wp-content/uploads/2019/06/gambar-pemandangan-format-png9.jpg' }} style={{ height: '100%', width: '100%' }}>
      <SafeAreaView
        style={{
          marginHorizontal: 20,
          marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0
        }}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          style={{
            minHeight: '100%'
          }}
        >
          <ListMap location={navigation.state.params.trash.location} trash={navigation.state.params.trash} key={navigation.state.params.trash._id} deleteTrash={deleteTrashId}/>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  )
}