import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as fromComponents from './components';
import * as fromServices from './services';

const routes: Routes = [
  { path: '', component: fromComponents.SignupComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [...fromComponents.components],
  providers: [...fromServices.services],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class SignupModule { }
