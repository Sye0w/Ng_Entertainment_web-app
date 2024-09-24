import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';

export const routes: Routes = [
  {
    path:'**',
    component: LoginComponent,
  },
  {
    path: 'signup',
    loadComponent: ()=>
    import('./components/auth/sign-up/sign-up.component')
    .then(mod => mod.SignUpComponent),
  },
  {
    path: 'homepage',
    loadComponent: ()=>
    import('./views/home-dashboard/home-dashboard.component')
    .then(mod => mod.HomeDashboardComponent),
  },
  {
    path: 'movies',
    loadComponent: ()=>
    import('./views/movies-dashboard/movies-dashboard.component')
    .then(mod => mod.MoviesDashboardComponent),
  },
  {
    path: 'tv-series',
    loadComponent: ()=>
    import('./views/series-dashboard/series-dashboard.component')
    .then(mod => mod.SeriesDashboardComponent)
  },
  {
    path: 'bookmarks',
    loadComponent: ()=>
    import('./views/bookmarked-dashboard/bookmarked-dashboard.component')
    .then(mod => mod.BookmarkedDashboardComponent)
  }
];
