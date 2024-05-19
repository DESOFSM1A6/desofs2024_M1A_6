import { Component } from '@angular/core';
import { AuthenticationService } from './Services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'JN ISEP';
  isLoggedIn: boolean = false;
  role: String = "Leitor";

  constructor(public authService: AuthenticationService) {
    this.authService.isLoggedIn.subscribe(x => this.isLoggedIn = x);
  }

  logout(){
    this.authService.logout();
  }

  setRoleJornalista(){
    this.role = "Jornalista";
  }

  setRoleEditor(){
    this.role = "Editor";
  }
  setRoleLeitor(){
    this.role = "Leitor";
  }
}
