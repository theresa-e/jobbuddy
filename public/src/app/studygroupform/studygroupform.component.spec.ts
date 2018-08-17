import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudygroupformComponent } from './studygroupform.component';

describe('StudygroupformComponent', () => {
  let component: StudygroupformComponent;
  let fixture: ComponentFixture<StudygroupformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudygroupformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudygroupformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
