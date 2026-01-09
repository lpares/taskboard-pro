import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';

export interface TaskItem {
  id: number;
  title: string;
  description?: string;
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
    return of(this.tasks);
  }

  getTask(taskId:number) {
    return of(this.tasks.find(task => task.id === taskId));
  }

  addTask(title:string, description?: string) {
    const newTask = { 
      id: Date.now(), 
      title, 
      description,
      completed: false
    };
    this.tasks.push(newTask);
    this.tasksSubject.next(this.tasks); // émet la nouvelle liste
  }

  updateTask(id: number, title: string, description?: string) : Observable<TaskItem[]> {
    this.getTask(id).subscribe(task => {
      if (task) {
        task.title = title;
        task.description = description;
        console.log(task);
        this.tasks = this.tasks.map(t => t.id === id ? { ...t, title, description } : t);
        this.tasksSubject.next(this.tasks); // émet la nouvelle liste
        console.log(this.tasks);
      }
    });
    return of(this.tasks);
  }

  deleteTask(id: number) : Observable<TaskItem[]> {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.tasksSubject.next(this.tasks); // émet la nouvelle liste
    return of(this.tasks);
  }
}
