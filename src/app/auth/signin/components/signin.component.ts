import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromStore from '../store';

@Component({
  selector: 'w-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  public signinForm: FormGroup;
  public show = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<fromStore.SignInState>
  ) {
    this.signinForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.signinForm.dirty && this.signinForm.valid) {
      this._store.dispatch(fromStore.signIn(this.signinForm.value));
    }
  }

  getField(field: string) {
    return this.signinForm.get(field);
  }
}
