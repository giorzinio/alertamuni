import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthService  } from './services/auth/auth.service';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'admision',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'admision', canActivate: [AuthService], loadChildren: './admision/admision.module#AdmisionPageModule' },
  { path: 'admision-details', canActivate: [AuthService], loadChildren: './admision-details/admision-details.module#AdmisionDetailsPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
