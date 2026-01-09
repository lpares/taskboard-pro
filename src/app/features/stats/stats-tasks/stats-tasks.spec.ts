import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsTasks } from './stats-tasks';

describe('StatsTasks', () => {
  let component: StatsTasks;
  let fixture: ComponentFixture<StatsTasks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsTasks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsTasks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
