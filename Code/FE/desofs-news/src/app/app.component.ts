import { Component, OnInit } from '@angular/core';
import { KeycloakService } from './Services/keycloak-init.factory';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'JN ISEP';
  roles: String[] = [];
  role = "";
  isAuthenticated: boolean = false;

  constructor(private keycloakService: KeycloakService) { }

  ngOnInit() {
    console.log("TEST NEW DEPLOYMENT")
    
    // Verificar se o utilizador está na página de login e não está autenticado para definir as roles
    if (window.location.pathname === '/login' && !this.isAuthenticated) {
      this.setRoles(); // Definir as roles
    } else if (window.location.pathname === '/logout'){
        this.keycloakService.logout();
    } else {
      // Verificar se o utilizador já está autenticado
      this.keycloakService.init('check-sso').then(authenticated => {
        this.isAuthenticated = authenticated;
        this.setRoles();
      }).catch(err => {
        console.error('Keycloak initialization failed', err);
      });
    }
  }

  setRoles() {
    this.roles = this.keycloakService.getUserRoles();
    if (this.roles.includes("Leitor")) {
      this.role = "Leitor";
    }

    if (this.roles.includes("Jornalista")) {
      this.role = "Jornalista";
    }

    if (this.roles.includes("Editor")) {
      this.role = "Editor";
    }
  }
}
