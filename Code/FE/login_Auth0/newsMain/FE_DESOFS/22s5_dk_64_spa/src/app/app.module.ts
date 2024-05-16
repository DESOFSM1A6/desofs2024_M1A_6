import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { DeliveriesComponent } from './Components/deliveries/deliveries.component';
import { MessagesComponent } from './messages/messages.component';
import { CamiaoComponent } from './Components/camiao/camiao.component';
import { HomeComponent } from './Components/home/home.component';
import { WarehouseComponent } from './Components/warehouse/warehouse.component';
import { PercursoComponent } from './Components/percurso/percurso.component';
import { VisualizationComponent } from './Components/visualization/visualization.component';
import { RotaComponent } from './Components/rota/rota.component';
import { NewsComponent } from './Components/news/news.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DeliveriesComponent,
    MessagesComponent,
    CamiaoComponent,
    HomeComponent,
    WarehouseComponent,
    PercursoComponent,
    VisualizationComponent,
    RotaComponent,
    NewsComponent
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
