import { Routes } from '@angular/router';

import { Home } from './home/home';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home, pathMatch: 'full' },
    { 
        path: 'about',
        loadChildren: () => import('./features/about/routes').then(m => m.ABOUT_ROUTES),
        pathMatch: 'full' 
    },
    { 
        path: 'tasks', 
        loadChildren: () => import('./features/tasks/routes').then(m => m.TASKS_ROUTES),
        pathMatch: 'full'
    }
];
