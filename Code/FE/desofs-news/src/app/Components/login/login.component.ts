import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../../Services/keycloak-init.factory';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private keycloakService: KeycloakService) {}

  ngOnInit() {
    this.keycloakService.init().then(authenticated => {
      if (authenticated) {
        // Redirecionar para a página principal ou outra página após autenticação
        window.location.href = '/home';
      }
    }).catch(err => {
      console.error('Failed to login with Keycloak', err);
    });
  }
}
