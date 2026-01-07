import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, of } from 'rxjs';

export interface TaskItem {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: TaskItem[] = [
    { id: 1, title: 'Task 1', description: 'Description for Task 1', completed: false },
    { id: 2, title: 'Task 2', description: 'Description for Task 2', completed: false },
    { id: 3, title: 'Task 3', description: 'Description for Task 3', completed: false }
  ];
  
  private tasksSubject = new BehaviorSubject(this.tasks);
  tasks$ = this.tasksSubject.asObservable();

  getTasks() {
    return of(this.tasks).pipe(delay(2000));
  }

  addTask(title:string) {
    const newTask = { 
      id: this.tasks.length + 1, 
      title, 
      description: 'Description for Task ' + (this.tasks.length + 1),
      completed: false
    };
    this.tasks.push(newTask);
    this.tasksSubject.next(this.tasks); // émet la nouvelle liste
  }
}
