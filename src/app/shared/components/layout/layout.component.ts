import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'w-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  public currentRoute: string = '';

  constructor(private router: Router) {
    this.router.events.subscribe((val) => {
      this.currentRoute = this.router.url;
    });
  }
}
