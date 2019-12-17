import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, AsyncStorage, Alert, Text, StatusBar } from 'react-native';
import MapView from 'react-native-maps';
import { LoadingComponent, ErrorComponent } from '../component/SpamComponent'
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { GET_ALL_TRASH_FOR_MAP } from '../graphAction/query';
import MapCreateComponent from '../component/MapForCreate';
import { MUTATION_CREATE_NEW_TRASH } from '../graphAction/mutation';

export default ({ navigation }) => {
  const [ token, setToken ] = useState('');
  const [ goFetch, {data, loading, error} ] = useLazyQuery(GET_ALL_TRASH_FOR_MAP,{ variables: { token } })

  const [ submitCreate, create ] = useMutation( MUTATION_CREATE_NEW_TRASH )

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem("token");
      setToken(token)
      goFetch()
    }
    getToken();
  }, [])

  const actionCreate = async ({ longitude, latitude }) => {
    try {
      await submitCreate({
        variables: { longitude: String(longitude), latitude: String(latitude), token },
        update (cache, { data: { makeTrash } }) {
          const { AllTrash } = cache.readQuery({ query: GET_ALL_TRASH_FOR_MAP, variables: { token } });
          cache.writeQuery({
            query: GET_ALL_TRASH_FOR_MAP,
            variables: { token },
            data: { AllTrash: [ ...AllTrash, makeTrash ] }
          })
        }
      })
    } catch({ graphQLErrors }) { console.log(graphQLErrors) }
  }

  if(loading) return <LoadingComponent />
  if(error) return <ErrorComponent />
  // if(create.loading) return <LoadingComponent />

  return (
    <MapView 
      style={styles.mapStyle} 
      onPress={({ nativeEvent }) => {
        Alert.alert(
          'create',
          `longitude: ${nativeEvent.coordinate.longitude},
latitude: ${nativeEvent.coordinate.latitude}`,
          [
            { text: 'NO' },
            { text: 'YES', onPress: () => actionCreate({ longitude: nativeEvent.coordinate.longitude, latitude: nativeEvent.coordinate.latitude })} 
          ],
          { cancelable: false }
        )
      }}
      camera={{
        center: {
          latitude: -6.2607917,
          longitude: 106.7810557
        },
        pitch: 0,
        heading: 0,
        altitude: 5000,
        zoom: 14
      }}>
        {
          (data)
            ?
            data.AllTrash.map((trash, i) => (
              <MapCreateComponent
                data={trash}
              />
            ))
            :
            null
        }
    </MapView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: '100%'
  },
});