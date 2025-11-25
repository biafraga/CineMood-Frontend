import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './pages/public/home/home.component';
import { FilmesPorMoodComponent } from './pages/public/filmes-por-mood/filmes-por-mood.component';

import { AdminComponent } from './admin/admin.component';
import { AdminLayoutComponent } from './core/layout/admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { FilmesListaComponent } from './pages/admin/filmes-lista/filmes-lista.component';
import { PessoasListaComponent } from './pages/admin/pessoas-lista/pessoas-lista.component';

import { authGuard } from './core/guards/auth.guard';


export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent 
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'filmes/mood/:id', 
    component: FilmesPorMoodComponent 
  },
  { 
    path: 'admin', 
    component: AdminLayoutComponent, 
    canActivate: [authGuard], 
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      
      { path: 'dashboard', component: DashboardComponent },
      { path: 'filmes', component: FilmesListaComponent },
      { path: 'pessoas', component: PessoasListaComponent }
    ] 
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];
