const {
  VITE_SERVER_URL: SERVER_LINK,
  VITE_ROLE_NAME: ASYNC_STORAGE_ROLE_NAME,
  VITE_TOKEN_NAME: ASYNC_STORAGE_TOKEN_NAME,
  VITE_GOOGLE_CLIENT_KEY: GOOGLE_CLIENT_KEY,
  VITE_WEBSITE_NAME: APP_NAME,
  VITE_KEYCLOAK_URL: KEYCLOAK_URL,
  VITE_KEYCLOAK_CLIENT_ID: KEYCLOAK_CLIENT_ID,
  VITE_KEYCLOAK_REALM: KEYCLOAK_REALM,
} = import.meta.env;

export default {
  SERVER_LINK,
  ASYNC_STORAGE_TOKEN_NAME,
  ASYNC_STORAGE_ROLE_NAME,
  GOOGLE_CLIENT_KEY,
  APP_NAME,
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_REALM,
  KEYCLOAK_URL,
};
