import Keycloak from 'keycloak-js';
import localEnvironment from './localEnvironment';

const keycloak = new Keycloak({
  url: localEnvironment.KEYCLOAK_URL,
  clientId: localEnvironment.KEYCLOAK_CLIENT_ID,
  realm: localEnvironment.KEYCLOAK_REALM,
});

keycloak.init({
  redirectUri: 'http://127.0.0.1:5173/homepage',
});

export default keycloak;
