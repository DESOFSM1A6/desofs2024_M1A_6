import { Component, OnInit } from '@angular/core';
import { AuthGuard } from './Services/guard/auth.guard';
import { KeycloakService } from './Services/keycloak-init.factory';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'JN ISEP';
  roles: String[] = [];
  role = "";
  isAuthenticated: boolean = false;

  constructor(private keycloakService: KeycloakService) {}

  ngOnInit() {
    this.keycloakService.init().then(authenticated => {
      this.isAuthenticated = authenticated;
      if (authenticated) {
        this.roles = this.keycloakService.getUserRoles();
        this.setRoles();
      }
    }).catch(err => {
      console.error('Keycloak initialization failed', err);
    });
  }

  setRoles(){
    this.roles = this.keycloakService.getUserRoles();
    console.log(this.roles);
    if(this.roles.includes("Leitor")){
      this.role = "Leitor";
    }
    
    if(this.roles.includes("Jornalista")){
      this.role = "Jornalista";
    }
    
    if(this.roles.includes("Editor")){
      this.role = "Editor";
    }
  }
}
