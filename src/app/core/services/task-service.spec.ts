import { TestBed } from '@angular/core/testing';

import { TaskService } from './task-service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('devrait ajouter une tâche', () => {
    service.addTask('Apprendre des trucs');

    const tasks = service.getTasks();
    tasks.subscribe((taskList) => {
      expect(taskList.length).toBe(4);
      expect(taskList[3].title).toBe('Apprendre des trucs');
      expect(taskList[3].completed).toBe(false);
    });
  });

  it('devrait supprimer une tâche', () => {
    service.deleteTask(3);
    service.getTasks().subscribe((tasks) => {
      expect(tasks.length).toBe(2);
      expect(tasks[2]).toBeUndefined();
      expect(tasks[1].title).toBe('Task 2');
    });
  })

  it('devrait mettre à jour une tâche', () => {
    service.updateTask(1, 'Tâche mise à jour');
    service.getTasks().subscribe((tasks) => {
      expect(tasks[0].title).toBe('Tâche mise à jour');
    });
  });
});
