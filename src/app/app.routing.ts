import { Routes } from '@angular/router';

import { AuthGuard } from '../app/shared/Guards/auth.guard';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { UserLayoutComponent } from './shared/components/layouts/UserLayout/user-layout.component';
import { EmailVerificationComponent } from './pages/Extras/email-verification/email-verification.component';
import { SecEmailVerificationComponent } from './pages/Extras/sec-email-verification/sec-email-verification.component';


export const rootRouterConfig: Routes = [

    {
        path: '', component: LoginComponent
    },
    {
        path: 'register', component: RegisterComponent
    },
    {
        path: 'home', component: UserLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
        ]
    },
    {
        path: 'settings', component: UserLayoutComponent,
        children: [
            { path: '', component: SettingsComponent },
        ]
    },
    {
        path: 'email-verification/:emailId/:code', component: EmailVerificationComponent
    },
    {
        path: 'secondary-email-verification/:emailId/:code', component: SecEmailVerificationComponent
    },
    
]
