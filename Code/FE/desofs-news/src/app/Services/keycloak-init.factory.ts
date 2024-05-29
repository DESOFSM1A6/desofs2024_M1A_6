import { Injectable } from '@angular/core';
import Keycloak, {KeycloakInstance} from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private keycloak: KeycloakInstance;

  constructor() {
    this.keycloak = new Keycloak({
      url: 'http://localhost:9090',
      realm: 'jn-desofs',
      clientId: 'oauth2-backend-client'
    });
  }

  init(): Promise<boolean>  {
    return this.keycloak.init({
      onLoad: 'login-required',
      checkLoginIframe: false,
      pkceMethod: 'S256'
    }).then(authenticated => {
      return authenticated;
    }).catch(err => {
      console.error('Failed to initialize Keycloak', err);
      return Promise.reject(err);
    });
  }

  getUserRoles(): string[] {
    if (this.keycloak && this.keycloak.tokenParsed && this.keycloak.clientId) {
      const resourceAccess = this.keycloak.tokenParsed['realm_access'] || {};
      return (resourceAccess as { roles: string[] })['roles'];
    }
    return [];
  }
  
}
