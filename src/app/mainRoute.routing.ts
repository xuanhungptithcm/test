import { ZoneDetailComponent } from './main-content/content/dashboard/zone-detail/zone-detail.component';
import { PlayListComponent } from './main-content/content/play-list/play-list.component';
import { ManagerMusicComponent } from './main-content/content/manager-music/manager-music.component';
import { DashboardComponent } from './main-content/content/dashboard/dashboard.component';
import { ContentComponent } from './main-content/content/content.component';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthenticationService } from './Shared/services/authentication.service';
import { RegisterComponent } from './main-content/content/register/register.component';
import { HomeComponent } from './main-content/home.component';
import { ManagerUserComponent } from './main-content/content/manager-user/manager-user.component';

const routing: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'vn', redirectTo: '/login', pathMatch: 'full' },
  { path: 'en', redirectTo: '/login', pathMatch: 'full' },
  {
    canActivate: [AuthenticationService],
    path: 'home', component: HomeComponent, children: [

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard', component: DashboardComponent
      },
      {
        path: 'listmusic', component: ContentComponent
      },
      {
        path: 'update', component: RegisterComponent
      },
      {
        path: 'manager-user', component: ManagerUserComponent
      },
      {
        path: 'manager-music', component: ManagerMusicComponent
      },
      {
        path: 'play-list', component: PlayListComponent
      },
      {
        path: 'zone-detail', component: ZoneDetailComponent
      }
    ]
  },
  { path: 'user', loadChildren: './UserModule/UserModule.module#UserModule' },
  { path: 'login', loadChildren: './Login/Login.module#LoginModule' }
];
const Routing: ModuleWithProviders = RouterModule.forRoot(routing, { useHash: true });

export const MainRoute = Routing;
