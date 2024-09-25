import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthComponent } from './views/auth/auth.component';

export const routes: Routes = [
  // Default route
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },

  // Auth routes
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      {
        path: 'signup',
        loadComponent: () => import('./components/auth/sign-up/sign-up.component').then(mod => mod.SignUpComponent)
      }
    ]
  },

  // Main app routes
  {
    path: 'app',
    loadComponent: () => import('./views/homepage/homepage.component')
    .then(mod => mod.HomepageComponent),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./views/home-dashboard/home-dashboard.component').then(mod => mod.HomeDashboardComponent)
      },
      {
        path: 'movies',
        loadComponent: () => import('./views/movies-dashboard/movies-dashboard.component').then(mod => mod.MoviesDashboardComponent)
      },
      {
        path: 'tv-series',
        loadComponent: () => import('./views/series-dashboard/series-dashboard.component').then(mod => mod.SeriesDashboardComponent)
      },
      {
        path: 'bookmarks',
        loadComponent: () => import('./views/bookmarked-dashboard/bookmarked-dashboard.component').then(mod => mod.BookmarkedDashboardComponent)
      }
    ]
  },

  // Wildcard route for 404
  // {
  //   path: '**',
  //   loadComponent: () => import('./components/not-found/not-found.component').then(mod => mod.NotFoundComponent)
  // }
  // { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
];
