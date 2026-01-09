import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TaskHighlight } from "./task-highlight";

describe('TaskHighlight', () => {
  let component: TaskHighlight;
  let fixture: ComponentFixture<TaskHighlight>;

  beforeEach(async () => {
    // config module de test
    await TestBed.configureTestingModule({
      imports: [TaskHighlight]
    }).compileComponents();

    // créé le composant
    fixture = TestBed.createComponent(TaskHighlight);
    component = fixture.componentInstance;
  });

  it('devrait initialiser title avec une chaine vide', () => {
    const component = new TaskHighlight();
    expect(component.title).toBe('');
  });

  it('devrait permettre de changer de titre', () => {
    const component = new TaskHighlight();
    component.title = 'Tâche mise en avant';
    expect(component.title).toBe('Tâche mise en avant');
  });

  it('devrait afficher le titre dans le DOM', () => {
    // ARRANGE
    component.title = 'Tâche mise en avant';
    
    // ACT
    fixture.detectChanges();
    
    // ASSERT
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('Tâche mise en avant');
  });
});
