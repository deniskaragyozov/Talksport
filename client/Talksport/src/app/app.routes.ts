import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./features/home/home').then(c => c.Home)
    },
    {
        path: 'articles',
        loadComponent: () => import('./features/articles/articles').then(c => c.Articles)
    },
    {
        path: 'register',
        loadComponent: () => import('./features/register/register').then(c => c.Register)
    }
];
