import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { HomeComponent } from './Components/home/home.component';

import { NewsComponent } from './Components/news/news.component';
import { NewsSubmissionComponent } from './Components/news-submission/news-submission.component';
import { NewsValidationComponent } from './Components/news-validation/news-validation.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { LoginComponent } from './Components/login/login.component';
import { LogoutComponent } from './Components/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    LoginComponent,
    LogoutComponent,
    HomeComponent,
    NewsComponent,
    NewsSubmissionComponent,
    NewsValidationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    KeycloakAngularModule
  ],
  providers: [KeycloakService],
  bootstrap: [AppComponent]
})
export class AppModule { }
