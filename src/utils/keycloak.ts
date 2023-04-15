import Keycloak from 'keycloak-js';
import localEnvironment from './localEnvironment';

const keycloakConfig = new Keycloak({
  url: localEnvironment.KEYCLOAK_URL,
  clientId: localEnvironment.KEYCLOAK_CLIENT_ID,
  realm: localEnvironment.KEYCLOAK_REALM,
});

export default keycloakConfig;
