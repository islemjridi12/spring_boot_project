import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent }, // page publique

  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // ✅ redirection par défaut
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'employes',
        loadComponent: () =>
          import('./features/employe/components/List/employe-list.component').then(
            (m) => m.EmployeListComponent
          ),
      },
      {
        path: 'machines',
        loadComponent: () =>
          import('./features/machine/components/machine-list/machine-list.component').then(
            (m) => m.MachineListComponent
          ),
      },
      {
        path: 'produits',
        loadComponent: () =>
          import('./features/produit/components/produit-list/produit-list.component').then(
            (m) => m.ProduitListComponent
          ),
      },
      {
        path: 'ordre-fabrication',
        loadComponent: () =>
          import('./features/ordre-fabrication/components/list/list.component').then(
            (m) => m.ListComponent
          ),
      },
    ],
  },
];
