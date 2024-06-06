import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { NewsComponent } from './Components/news/news.component';
import { NewsSubmissionComponent } from './Components/news-submission/news-submission.component';
import { NewsValidationComponent } from './Components/news-validation/news-validation.component';
import { LoginComponent } from './Components/login/login.component';
import { JornalistaGuard } from './Services/guard/JornalistaGuard';
import { EditorGuard } from './Services/guard/EditorGuard';
import { LogoutComponent } from './Components/logout/logout.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'home', component: HomeComponent },
  {path: 'news', component: NewsComponent},
  {path: 'news-submission', component: NewsSubmissionComponent, canActivate: [JornalistaGuard] },
  {path: 'news-validation', component: NewsValidationComponent, canActivate: [EditorGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
