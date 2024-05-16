import { CamiaoComponent } from './Components/camiao/camiao.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { DeliveriesComponent } from "./Components/deliveries/deliveries.component";
import { WarehouseComponent } from './Components/warehouse/warehouse.component';
import { HomeComponent } from './Components/home/home.component';
import { PercursoComponent } from './Components/percurso/percurso.component';
import { VisualizationComponent } from './Components/visualization/visualization.component';
import { RotaComponent } from './Components/rota/rota.component';
import { NewsComponent } from './Components/news/news.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'camiao', component: CamiaoComponent },
  { path: 'deliveries', component: DeliveriesComponent },
  { path: 'warehouse', component: WarehouseComponent },
  { path: 'percurso', component: PercursoComponent },
  { path: 'visualization', component: VisualizationComponent },
  {path: 'rota', component: RotaComponent},
  {path: 'news', component: NewsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
