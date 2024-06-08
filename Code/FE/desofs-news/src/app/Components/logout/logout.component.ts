import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../../Services/keycloak-init.factory';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  constructor(private keycloakService: KeycloakService) {}

  ngOnInit() {
    this.keycloakService.logout();
    
  }
}
