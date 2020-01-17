import React from 'react';
import Navigation from './navigation'
import client from './graph/client'
import { ApolloProvider } from '@apollo/react-hooks';

console.disableYellowBox = true

export default () => (
  <ApolloProvider client={client}>
    <Navigation/>
  </ApolloProvider>
)