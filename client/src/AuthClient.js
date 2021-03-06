import { Auth, AUTH_STRATEGIES } from '@8base/auth';
/**
 * Creating an Authentication Profile in 8base will provide
 * you with a Client ID and Domain.
 */
const domain = process.env.AUTH_DOMAIN || process.env.REACT_APP_AUTH_DOMAIN;
const clientId = process.env.CLIENT_ID || process.env.REACT_APP_CLIENT_ID;
/**
 * The redirect and logout URIs are all configured in the
 * authentication profile that gets set up in the 8base
 * management console.
 */
 
const logoutRedirectUri = `${window.location.origin}/`;
const redirectUri = `${window.location.origin}/auth/callback`;
/**
 * There are multiple auth strategies that can be
 * used when using 8base. By default, specifying
 * 'web_8base' will configure the 8base auth client.
 */
export default Auth.createClient(
  {
    strategy: AUTH_STRATEGIES.WEB_8BASE,
    subscribable: true,
  },
  {
    domain,
    clientId,
    redirectUri,
    logoutRedirectUri,
  }
);
