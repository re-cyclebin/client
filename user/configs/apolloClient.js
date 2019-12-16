import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://boostle.dreamcarofficial.com:4000/',
});

export default client