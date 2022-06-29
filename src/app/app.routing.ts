import { Routes } from '@angular/router';

import { AuthGuard } from '../app/shared/Guards/auth.guard';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';

export const rootRouterConfig: Routes = [

    {
        path: '', component: LoginComponent
    },
    {
        path: 'register', component: RegisterComponent
    },
    {
        path: 'home', component: HomeComponent,
    },
]
