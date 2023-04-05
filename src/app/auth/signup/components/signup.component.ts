import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';

import * as fromStore from '../store';

@Component({
  selector: 'w-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  public signupForm: FormGroup;
  public show = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<fromStore.SignUpState>
  ) {
    this.signupForm = this._formBuilder.group({
      fullname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.signupForm.dirty && this.signupForm.valid) {
      this._store.dispatch(fromStore.signUp(this.signupForm.value));
    }
  }

  getField(field: string) {
    return this.signupForm.get(field);
  }
}
