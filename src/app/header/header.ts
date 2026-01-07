import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  // templateUrl: './header.html',
  styleUrl: './header.css',
  template: `
    <nav style="padding: .5rem; border-bottom: 1^x solid #ddd;">
      <a routerLink="/"
         routerLinkActive="active">
          Accueil
      </a>
      <a routerLink="/about" routerLinkActive="active">
        A propos
      </a>
    </nav>
  `
})
export class Header {
  title = "TaskBoard Pro";
}
