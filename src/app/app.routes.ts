import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AdminLayoutComponent } from './core/layout/admin-layout/admin-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { FilmesListaComponent } from './pages/admin/filmes-lista/filmes-lista.component';
import { PessoasListaComponent } from './pages/admin/pessoas-lista/pessoas-lista.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminLayoutComponent, canActivate: [authGuard], children: [{
    path: 'dashboard', component: DashboardComponent},
    {path: 'filmes', component: FilmesListaComponent},
    {path: 'pessoas', component: PessoasListaComponent},
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
    ] 
  },
  { path: '**',redirectTo: '/login'}
];
