import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { KeycloakService } from '../keycloak-init.factory';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JornalistaGuard implements CanActivate {

  constructor(private keycloak: KeycloakService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userRoles = this.keycloak.getUserRoles();

    // Verificar se o utilizador é jornalista
    if (userRoles.includes('Admin') || userRoles.includes('Editor') || userRoles.includes('Jornalista')) {
      return true; // Permitir o acesso à rota
    } else {
      // Redirecionar o utilizador para uma página de acesso negado
      return this.router.navigate(['/']);
    }
  }
}
