# NgEntertainment Web App

# Angular Performance Optimization Report:

##  Lazy Loading in Route Configuration:
This report analyzes the route configuration provided and highlights how lazy loading contributes to performance optimization in Angular applications. The configuration demonstrates several best practices for improving initial load time and overall application performance.

## Lazy Loading Implementation
The route configuration utilizes lazy loading in several places:

1. Sign-up component:
   ```typescript
   loadComponent: () => import('./components/auth/sign-up/sign-up.component').then(mod => mod.SignUpComponent)
   ```

2. Main app component (Homepage):
   ```typescript
   loadComponent: () => import('./views/homepage/homepage.component').then(mod => mod.HomepageComponent)
   ```

3. Child routes of the main app:
   - Home Dashboard
   - Movies Dashboard
   - TV Series Dashboard
   - Bookmarked Dashboard

### Analysis of the Route Configuration

1. **Auth Routes**: 
   - The login component is eagerly loaded, which is appropriate as it's likely to be one of the first components users interact with.
   - The sign-up component is lazy-loaded, which is a good strategy if sign-ups are less frequent than logins.

2. **Main App Routes**:
   - The main app component (HomepageComponent) is lazy-loaded, which is excellent for reducing the initial load time.
   - All child routes (home, movies, tv-series, bookmarks) are lazy-loaded, allowing for efficient loading of only the necessary components as the user navigates through the application.

## Change Detection Strategy and AsyncPipe in Navbar

Implementing an optimized change detection strategy for the navbar component is another crucial aspect of Angular performance optimization. This section focuses on how using `ChangeDetectionStrategy.OnPush` in the navbar contributes to overall application performance together with AsyncPipe.

### Analysis of Navbar Component with AsyncPipe and Change Detection Strategy

1. With the navbar component using AsyncPipe and ChangeDetectionStrategy.OnPush is ideal for performance optimization, the component is identified for change detection whenever the observable is emitted, which in this case is when an active route or current route identified ensuring visual feedback with current route is updated, whilst automatically suscribing when the component is initiated and vice versa when the component is destroyed preventing memory leaks.

### Performance Impact

1. **Faster Render Times**: By skipping unnecessary change detection cycles, the navbar (and consequently, the entire application) renders faster.

2. **Improved Application Responsiveness**: With the navbar using OnPush and AsyncPipe, Angular can focus its resources on detecting changes in more dynamic parts of the application.


### Usage in Ng Entertainment web app

```typescript
import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

  @Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  
  <a routerLink="/app/home" [class.active]="isHomeActive$ | async">
    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 0H1C.4 0 0 .4 0 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11H1c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1ZM19 0h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1Zm0 11h-7c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h7c.6 0 1-.4 1-1v-7c0-.6-.4-1-1-1Z" fill="#5A698F"/>
    </svg>
  </a>

```

## Template Optimization using conditional rendering and asyncpipe

With the approach of template optimization, asyncpipe together with conditional rendering avoids expensive DOM updates, which affect rendering time for templates and overall application performance gains.

### Analysis of Components with template optimization and AsyncPipe

1. Application components uses templates with conditional rendering and asyncpipes for sections of the template that heavliy relies on rendering content asynchronously and conditionally thereby minimizes rendering time for templates or components.

## Conclusion
The NgEntertainment Web App illustrates some common performance optimization techniques in Angular:

1. Lazy loading of routes and components, which significantly reduces initial load time and improves application startup performance.
   
2. Use of ChangeDetectionStrategy.OnPush and AsyncPipe in the navbar component, which optimizes change detection and improves overall application responsiveness.
  
3. Template optimization through conditional rendering and AsyncPipe, which minimizes expensive DOM updates and enhances rendering performance.

The above techniques collectively contribute to an overall application performance gains and enhanced metrics.

