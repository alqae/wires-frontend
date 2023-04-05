import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromStoreAuth from '@auth/store';
import * as fromModels from '@app/models';
import * as fromStore from '../../store';

@Component({
  selector: 'w-message-card',
  templateUrl: './message-card.component.html',
  styleUrls: ['./message-card.component.scss']
})
export class MessageCardComponent implements OnInit {
  @Input() message!: fromModels.Message;
  
  public commentForm: FormGroup;
  public canComment: boolean = false;
  public comments: fromModels.Comment[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _storeAuth: Store<fromStoreAuth.AuthState>,
    private _store: Store<fromStore.MessagesState>
  ) {
    this.commentForm = this._formBuilder.group({
      comment: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this._storeAuth.select(fromStoreAuth.getUserLogged).subscribe((user) => {
      if (user && this.message?.user && this.message?.user.id !== user.id) {
        this.canComment = true;
      }
    });

    if (this.message.comments) {
      this.comments = this.message.comments.map((comment) => typeof comment === 'string' ? JSON.parse(comment) : comment);
    }
  }

  onComment() {
    if (this.commentForm.valid && this.canComment) {
      const comment = this.commentForm.get('comment')?.value;
      this._store.dispatch(fromStore.commentMessage({ messageId: this.message.id, comment }));
      this.commentForm.reset();
    }
  }
}
