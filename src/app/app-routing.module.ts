import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import * as fromGuards from './shared/guards';

const routes: Routes = [
  {
    path: '',
    canActivate: [fromGuards.LoggedOutGuard],
    loadChildren: () => import('src/app/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'auth',
    canActivate: [fromGuards.LoggedOutGuard],
    loadChildren: () => import('src/app/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'messages',
    canActivate: [fromGuards.LoggedInGuard],
    loadChildren: () => import('src/app/messages/messages.module').then(m => m.MessagesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
