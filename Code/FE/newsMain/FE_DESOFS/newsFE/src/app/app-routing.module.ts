import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { NewsComponent } from './Components/news/news.component';
import { NewsSubmissionComponent } from './Components/news-submission/news-submission.component';
import { NewsValidationComponent } from './Components/news-validation/news-validation.component';
import { LoginComponent } from './Components/login/login.component';
import { AuthGuard } from './Services/guard/auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent },
  {path: 'news', component: NewsComponent},
  {path: 'news-submission', component: NewsSubmissionComponent, canActivate: [AuthGuard] },
  {path: 'news-validation', component: NewsValidationComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
