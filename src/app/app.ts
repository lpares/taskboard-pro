import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
  template: `
    <router-outlet></router-outlet>
  `
})
export class App {
  protected readonly title = signal('taskboard-pro');
}
