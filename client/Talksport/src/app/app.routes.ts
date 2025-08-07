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
    },
    {
        path: 'login',
        loadComponent: () => import('./features/login/login').then(c => c.Login)
    },
    {
        path: 'post',
        loadComponent: () => import('./features/post/post').then(c => c.Post)
    },
    {
        path: 'profile',
        loadComponent: () => import('./features/profile/profile').then(c => c.Profile)
    },
    {
        path: 'articles/:articleId',
        loadComponent: () => import('./features/details/details').then(c => c.Details)
    },
    {
        path: 'articles/:articleId/edit',
        loadComponent: () => import('./features/edit/edit').then(c => c.Edit)
    }
];
