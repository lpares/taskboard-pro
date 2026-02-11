import { ChangeDetectionStrategy, Component, inject, ViewChild, ViewContainerRef } from '@angular/core';
import { TaskItem, TaskService } from '../../../core/services/task-service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { TaskHighlight } from "../task-highlight/task-highlight";
import { RouterModule } from '@angular/router';
import { TaskEdit } from '../task-edit/task-edit';
import { NotificationService } from '../../../core/services/notification-service';

@Component({
  selector: 'app-tasks-page',
  imports: [AsyncPipe, CommonModule, RouterModule, TaskEdit, TaskHighlight],
  templateUrl: './tasks-page.html',
  styleUrl: './tasks-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksPage {
  tasks$: Observable<TaskItem[]>;

  highlightContainer: TaskHighlight | null = null;
  updateContainer: TaskEdit | null = null;

  private taskService = inject(TaskService);
  private notificationService = inject(NotificationService);

  constructor() {
    this.tasks$ = this.taskService.getTasks();
  };

  addTask(title:string, description?:string) {
    this.taskService.addTask(title, description);
    this.notificationService.whenAdding(title);
  }

  highlight(task: TaskItem) {
    this.highlightContainer = new TaskHighlight();
    this.highlightContainer!.title = task.title;
    this.highlightContainer!.description = task.description;
  }

  unHightListTask() {
    this.highlightContainer = null;
  }

  update(task: TaskItem) {
    this.updateContainer = new TaskEdit();
    this.updateContainer!.title = task.title;
    this.updateContainer!.description = task.description;
    this.updateContainer.update.subscribe((data) => {
      this.taskService.updateTask(task.id, data.title, data.description).subscribe(() => {
        this.tasks$ = this.taskService.getTasks();
        this.notificationService.whenUpdating(task.title);
        this.updateContainer = null;
      });
    });
  }

  cancelUpdate() {
    this.updateContainer = null;
  }

  finish(task: TaskItem) {
    task.completed = !task.completed;
  }

  delete(task: TaskItem) {
    if (confirm(`Voulez-vous vraiment supprimer la tâche "${task.title}" ?`)) {
      this.taskService.deleteTask(task.id).subscribe(() => {
        this.tasks$ = this.taskService.getTasks();
        this.notificationService.whenDeleting(task.title);
      });
    }
  }
}