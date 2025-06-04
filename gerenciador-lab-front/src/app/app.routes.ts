import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) },

  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'laboratorio/:id',
    loadComponent: () => import('./pages/laboratories/laboratorie/laboratorie.component').then(m => m.LaboratorieComponent)
  },
  {
    path: 'criar',
    loadComponent: () => import('./pages/laboratories/create-laboratorie/create-laboratorie.component').then(m => m.CreateLaboratorieComponent)
  },
  {
    path: 'computador/criar/:laboratorioId',
    loadComponent: () => import('./pages/computers/create-computer/create-computer.component').then(m => m.CreateComputerComponent)
  },
  {
  path: 'computador/editar/:id',
  loadComponent: () => import('./pages/computers/edit-computer/edit-computer.component').then(m => m.EditComputerComponent)
  }

];