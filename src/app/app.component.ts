import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  path: string;

  constructor(private router: Router) {
    this.path = '';
    this.router.events.subscribe((path) => {
      if (this.path === path['url'] || path['url'].includes('#')) {
        return;
      }
      window.scrollTo(0, 0);
      this.path = path['url'];
    });
  }
}
