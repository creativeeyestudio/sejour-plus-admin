import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/inbox',
    pathMatch: 'full',
  },
  {
    path: 'hotel-data',
    loadComponent: () => import('./pages/hotel-data/hotel-data.page').then( m => m.HotelDataPage)
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services.page').then( m => m.ServicesPage)
  },
  {
    path: 'categories',
    loadComponent: () => import('./pages/categories/categories.page').then( m => m.CategoriesPage)
  },
  {
    path: 'activities',
    loadComponent: () => import('./pages/activities/activities.page').then( m => m.ActivitiesPage)
  },
];
