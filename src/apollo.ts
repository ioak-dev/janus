import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import store from './store/index';

const httpLink = createHttpLink({
  uri: process.env.VUE_APP_GRAPHQL_URL
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization:
        `${store.getters.getProfile?.space} ${store.getters.getProfile?.auth?.token}` || ''
    }
  };
});

// export const defaultClient = new ApolloClient({
//   uri: 'http://localhost:4000/graphql',
//   cache: new InMemoryCache()
// });

export const defaultClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
