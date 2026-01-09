import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.html',
  styleUrls: ['./task-edit.css']
})
export class TaskEdit {
  @Input() title: string = '';
  @Input() description?: string = '';
  @Output() update = new EventEmitter<{ title: string, description: string }>();
  @Output() cancel = new EventEmitter<void>();

  updateTask(newTitle: string, newDescription: string) {
    this.title = newTitle;
    this.description = newDescription;
    this.update.emit({title: newTitle, description: newDescription});
  }

  cancelUpdate() {
    this.cancel.emit();
  }
}
