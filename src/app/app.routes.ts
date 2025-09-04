import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'heroes',
    loadComponent: () =>
      import('./features/heroes/pages/heroe-page/heroe-page.component').then(
        (m) => m.HeroePageComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'heroes',
    pathMatch: 'full',
  },
];
