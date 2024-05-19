import { Routes } from '@angular/router';

export const routes: Routes = [
  
    {
        path:'signup',
        loadComponent: () =>
        import('./components/signup/signup.component').then
        ((com) => com.SignupComponent)
    },

    {
        path:'',
        loadComponent: () =>
        import('./components/signup/signup.component').then
        ((com) => com.SignupComponent)
    },

    {
        path:'**',
        loadComponent: () =>
        import('./components/signup/signup.component').then
        ((com) => com.SignupComponent)
    }
];
