import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  whenAdding(taskName:string) {
    alert(`La tâche ${taskName} a été ajoutée avec succès !`);
  }

  whenUpdating(taskName:string) {
    alert(`La tâche ${taskName} a été modifiée avec succès !`);
  }

  whenDeleting(taskName:string) {
    alert(`La tâche ${taskName} a été supprimée avec succès !`);
  }
}
