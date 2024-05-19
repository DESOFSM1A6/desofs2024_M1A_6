import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public isLoggedInSub: BehaviorSubject<boolean>;
  public isLoggedIn: Observable<boolean>;

  constructor(private router: Router) {
    this.isLoggedInSub = new BehaviorSubject<boolean>(false);
    this.isLoggedIn = this.isLoggedInSub.asObservable();
  }

  public get isLoggedInValue(): boolean {
    return this.isLoggedInSub.value;
  }


  login(): void {
    this.isLoggedInSub.next(true);
  }

  logout(): void {
    this.isLoggedInSub.next(false);
    this.router.navigate(['/login']);
  }
}
