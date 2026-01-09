import { Component, inject } from '@angular/core';
import { TaskService } from '../../../core/services/task-service';
import { map } from 'rxjs';

@Component({
  selector: 'app-stats-tasks',
  imports: [],
  templateUrl: './stats-tasks.html',
  styleUrl: './stats-tasks.css',
})
export class StatsTasks {
  private tasksService = inject(TaskService);
  totalTasks = this.tasksService.getTasks().pipe(map(tasks => tasks.length));
  totalFinished = this.tasksService.getTasks().pipe(map(tasks => tasks.filter(task => task.completed).length));
  totalUnfinished = this.tasksService.getTasks().pipe(map(tasks => tasks.filter(task => !task.completed).length));
}
