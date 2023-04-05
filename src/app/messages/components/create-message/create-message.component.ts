import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';

@Component({
  selector: 'w-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateMessageComponent {
  messageForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<fromStore.MessagesState>,
  ) {
    this.messageForm = this._formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      text: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]] // Validators.pattern(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)]]
    });
  }

  onSubmit() {
    if (this.messageForm.valid && this.messageForm.dirty) {
      this._store.dispatch(fromStore.createMessage(this.messageForm.value));
      this.messageForm.reset();
      this._store.dispatch(fromStore.loadMyMessages());
    }
  }

  getField(field: string) {
    return this.messageForm.get(field);
  }
}
