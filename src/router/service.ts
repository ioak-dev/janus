import store from '@/store';
import { defaultClient } from '@/apollo';
import { authorizeUserQuery } from '@/graphql/authorizeUser.query';
import { redirectToLogin, setCookie } from './library';

export const interpretAccessToken = (
  next: any,
  realm: number,
  accessToken: string,
  refreshToken: string
) => {
  defaultClient
    .query({
      query: authorizeUserQuery,
      variables: {
        accessToken,
        refreshToken
      }
    })
    .then((response) => {
      if (response?.data?.authorizeUser) {
        let newAccessToken = accessToken;
        if (response.data.authorizeUser.accessToken) {
          newAccessToken = response.data.authorizeUser.accessToken;
          setCookie(`janus_${realm}-access_token`, newAccessToken);
        }
        store.dispatch('addAuth', {
          auth: {
            ...response.data.authorizeUser.claims,
            accessToken: newAccessToken,
            isAuth: true
          }
        });
        next();
      } else {
        redirectToLogin(realm);
      }
    })
    .catch((error) => {
      redirectToLogin(realm);
    });
};
