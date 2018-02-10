export interface AuthenticationConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
}

export const AUTH_CONFIG: AuthenticationConfig = {
  CLIENT_ID: '[rzTPO9rgV4Tf52bR79A6jm4EpabfdWDu]',
  CLIENT_DOMAIN: '[morynicz.eu.auth0.com]', // e.g., you.auth0.com
  AUDIENCE: 'http://localhost:3001',
  REDIRECT: 'http://localhost:4200/callback',
  SCOPE: 'openid profile email'
};
