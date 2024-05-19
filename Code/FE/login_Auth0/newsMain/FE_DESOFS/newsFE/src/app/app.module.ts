import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { MessagesComponent } from './messages/messages.component';
import { HomeComponent } from './Components/home/home.component';

import { NewsComponent } from './Components/news/news.component';
import { NewsSubmissionComponent } from './Components/news-submission/news-submission.component';
import { NewsValidationComponent } from './Components/news-validation/news-validation.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MessagesComponent,
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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
