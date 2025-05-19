import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'employes', pathMatch: 'full' }, // ✅ redirige vers une vraie page
      { path: 'employes', loadComponent: () => import('./features/employe/components/List/employe-list.component').then(m => m.EmployeListComponent) },
      { path: 'machines', loadComponent: () => import('./features/machine/components/machine-list/machine-list.component').then(m => m.MachineListComponent) },
      { path: 'produits', loadComponent: () => import('./features/produit/components/produit-list/produit-list.component').then(m => m.ProduitListComponent) },
      { path: 'ordre-fabrication', loadComponent: () => import('./features/ordre-fabrication/components/list/list.component').then(m => m.ListComponent) },
    ]
  }
];
