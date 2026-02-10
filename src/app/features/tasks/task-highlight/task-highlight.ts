import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task-highlight',
  imports: [],
  templateUrl: './task-highlight.html',
  styleUrl: './task-highlight.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskHighlight {
  @Input() title = '';
  @Input() description? = '';
  @Output() unhighlight = new EventEmitter<void>();

  unHighlight() {
    this.unhighlight.emit();
  }
}
