import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromModels from '@app/models';
import * as fromStoreAuth from '@auth/store';
import * as fromStoreShared from '@shared/store';

@Component({
  selector: 'w-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public showActivityMenu = false;
  public showNavigationMenu = false;

  private userLogged$: Observable<fromModels.User | undefined>;
  public userLogged!: fromModels.User;

  constructor(
    private _storeAuth: Store<fromStoreAuth.AuthState>,
    private _storeShared: Store<fromStoreShared.SharedState>
  ) {
    this.userLogged$ = this._storeAuth.pipe(select(fromStoreAuth.getUserLogged));
    this.userLogged$.subscribe((user) => {
      if (typeof user !== 'undefined') {
        this.userLogged = user;
      }
    });
  }

  toggleNavigationMenu() {
    if (this.showActivityMenu) {
      this.showActivityMenu = !this.showActivityMenu;
    }
    this.showNavigationMenu = !this.showNavigationMenu;
  }

  toggleActivityMenu() {
    if (this.showNavigationMenu) {
      this.showNavigationMenu = !this.showNavigationMenu;
    }
    this.showActivityMenu = !this.showActivityMenu;
  }

  logOut() {
    this._storeAuth.dispatch(fromStoreAuth.logOut());
    this._storeShared.dispatch(new fromStoreShared.Go({ path: ['/auth/signin'] }));
  }
}
