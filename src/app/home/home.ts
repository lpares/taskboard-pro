import { Component, inject } from '@angular/core';
import { TaskService } from '../core/services/task-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
  template: `
   <h2>Accueil</h2>
   <p>Bienvenue sur l'application TaskBoard Pro.</p>
  `
})
export class Home {
  private taskService = inject(TaskService);
  tasks$ = this.taskService.getTasks();
  count = 0;
  intervalId: any;

  // ngOnInit() {
  //   this.intervalId = setInterval(() => {
  //     this.count++;
  //     console.log(this.count);
  //   }, 500);
  // }

  // ngOnDestroy() {
  //   clearInterval(this.intervalId); // pour éviter les fuites mémoire
  // }

  addTask(title:string) {
    this.taskService.addTask(title);
  }
}
