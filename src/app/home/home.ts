import { Component, inject } from '@angular/core';
import { TaskService } from '../core/services/task-service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
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
}
