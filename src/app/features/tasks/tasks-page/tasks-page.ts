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
  imports: [AsyncPipe, CommonModule, RouterModule],
  templateUrl: './tasks-page.html',
  styleUrl: './tasks-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksPage {
  tasks$: Observable<any[]>;
  
  @ViewChild('highlightContainer', {read: ViewContainerRef})
  highlightContainer!: ViewContainerRef;

  @ViewChild('updateContainer', {read: ViewContainerRef})
  updateContainer!: ViewContainerRef;

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
    // efface le précédent contenu
    this.highlightContainer.clear();

    // crée le composant TaskHighlight
    const ref = this.highlightContainer.createComponent(TaskHighlight);

    // passe les données de la tâche au composant
    ref.instance.title = task.title;
    ref.instance.description = task.description;

    // écoute l'événement unhighlight du composant pour fermer la fenêtre highlight
    ref.instance.unhighlight.subscribe(() => {
      this.highlightContainer.clear();
    })
  }

  update(task: TaskItem) {
    // efface le précédent contenu
    this.updateContainer.clear();

    // crée le composant TaskEdit
    const ref = this.updateContainer.createComponent(TaskEdit);

    // passe les données de la tâche au composant
    ref.instance.title = task.title;
    ref.instance.description = task.description;

    // écoute l'événement update du composant TaskEdit
    ref.instance.update.subscribe((updatedTask: { title: string, description: string }) => {
      this.taskService.updateTask(task.id, updatedTask.title, updatedTask.description);
      this.updateContainer.clear();
      this.notificationService.whenUpdating(task.title);
    });

    // écoute l'événement cancel du composant TaskEdit
    ref.instance.cancel.subscribe(() => {
      this.updateContainer.clear();
      this.taskService.getTasks();
    });
  }

  cancelUpdate() {
    this.updateContainer.clear();
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



