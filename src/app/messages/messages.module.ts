import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as fromComponents from './components';

const routes: Routes = [
  {
    path: '',
    component: fromComponents.MessagesComponent,
    children: [
      {
        path: 'create',
        component: fromComponents.CreateMessageComponent
      },
      {
        path: 'all',
        component: fromComponents.AllMessagesComponent
      },
      {
        path: 'my',
        component: fromComponents.MyMessagesComponent
      },
      {
        path: '**',
        redirectTo: 'all',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  declarations: [...fromComponents.components],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class MessagesModule { }
