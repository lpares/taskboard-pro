import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksPage } from './tasks-page';
import { BehaviorSubject, of } from 'rxjs';
import { TaskItem, TaskService } from '../../../core/services/task-service';

class MockTaskService {
  private tasks: TaskItem[] = [];
  private tasksSubject = new BehaviorSubject<TaskItem[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  getTasks() {
    return this.tasks$;
  }

  addTask(title:string, description?: string) {
    const newTask = { 
      id: Date.now(), 
      title, 
      description,
      completed: false
    };
    const tasks = this.tasksSubject.getValue();
    this.tasksSubject.next([...tasks, newTask]);
  }

  deleteTask(id: number) {
  }
}

fdescribe('TasksPage avec mock', () => {
  let component: TasksPage;
  let fixture: ComponentFixture<TasksPage>;
  let mockService: MockTaskService;

  beforeEach(async () => {
    mockService = new MockTaskService();
    await TestBed.configureTestingModule({
      imports: [TasksPage],
      providers: [
        { provide: TaskService, useValue: mockService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TasksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('devrait afficher les tâches', () => {
    mockService.addTask('Tâche 1');
    mockService.addTask('Tâche 2');
    
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('li').length).toBe(2);
    expect(compiled.querySelectorAll('li')[0].textContent).toContain('Tâche 1');
  });
});

describe('TasksPage', () => {
  let component: TasksPage;
  let fixture: ComponentFixture<TasksPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

