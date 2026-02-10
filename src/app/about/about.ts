import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  // templateUrl: './about.html',
  styleUrl: './about.css',
  template: `
    <h2>A propos</h2>
    <p>Infos sur l'application.</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class About {
  
}
