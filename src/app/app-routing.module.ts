import { ReportesComponent } from './components/reportes/reportes.component';
import { AuthGuard } from './auth.guard';
import { GuardarEditarComponent } from './components/guardar-editar/guardar-editar.component';
import { MantenimientoComponent } from './components/mantenimiento/mantenimiento.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductosComponent } from './components/productos/productos.component';

const routes: Routes = [
  {path:'dashboard', component: DashboardComponent},
  {path:'productos', component: ProductosComponent},
  {path:'login',component: LoginComponent},
  {path:'register',component: RegisterComponent},
  {path:'mantenimiento', component: MantenimientoComponent,canActivate:[AuthGuard]},
  {path:'guardar-editar/:id',component:GuardarEditarComponent,canActivate:[AuthGuard]},
  {path:'guardar-editar',component:GuardarEditarComponent,canActivate:[AuthGuard]},
  {path:'reportes',component:ReportesComponent,canActivate:[AuthGuard]},
  {path: '**', redirectTo: '/login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
