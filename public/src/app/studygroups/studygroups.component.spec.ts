import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudygroupsComponent } from './studygroups.component';

describe('StudygroupsComponent', () => {
  let component: StudygroupsComponent;
  let fixture: ComponentFixture<StudygroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudygroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudygroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
