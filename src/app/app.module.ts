import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core';

import { FlexLayoutModule } from '@angular/flex-layout';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


import { rootRouterConfig } from './app.routing'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatListModule} from '@angular/material/list';


// services 
import { UserAuthService} from './services/user-auth.service'
import { AuthGuard } from './shared/Guards/auth.guard';
import { LocalStoreService } from './services/local-storage.service';
import { JwtInterceptor } from './interceptors/token.interceptor';
import { SettingsComponent } from './settings/settings.component';
import { UserLayoutComponent } from './shared/components/layouts/UserLayout/user-layout.component';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    SettingsComponent,
    UserLayoutComponent,
    ToolbarComponent,
  ],
  imports: [
    BrowserModule,
    ApolloModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false, relativeLinkResolution: 'legacy' }),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    FlexLayoutModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatCardModule,
    MatTabsModule,
    MatSnackBarModule,
    MatListModule

  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'https://sample-elixir-phoenix-graphql.herokuapp.com/api/graphiql',
          }),
        };
      },
      deps: [HttpLink],
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

    UserAuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
