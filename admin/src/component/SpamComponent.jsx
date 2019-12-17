import React from 'react';
import { Text, View, ActivityIndicator, StyleSheet, ImageBackground } from 'react-native';

export const Error = (props) => (
  props.error.map(({message}, i) => (
    <Text
      style={{
        marginTop: 20,
        color: 'red'
      }}
    >
      { message }
    </Text>
  ))
)


export const LoadingComponent = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#00ff00" />
    <Text style={{ marginTop: 10 }}>LOADING...</Text>
  </View>
)


export const ErrorComponent = ({props}) => (
  <ImageBackground source={{ uri: 'https://i.ytimg.com/vi/8d7OAE2fJ1I/hqdefault.jpg' }} style={{ height: '100%', width: '100%' }}/>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 100
  }
})


export const EmptyComponent = () => (
  <ImageBackground source={{ uri: 'https://img.icons8.com/material/4ac144/256/search.png' }} style={{ height: '100%', width: '100%' }} />
)