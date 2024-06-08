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
    this.keycloakService.init('login-required').then(authenticated => {
      if (authenticated) {
        // Redirecionar para a página principal ou outra página após autenticação
        this.redirectToHome();

      }
    }).catch(err => {
      console.error('Failed to login with Keycloak', err);
    });
  }

  redirectToHome(): void {
    window.location.href = '/home';
  }
}
