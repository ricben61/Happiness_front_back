import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonparcoursComponent } from './monparcours.component';

describe('MonparcoursComponent', () => {
  let component: MonparcoursComponent;
  let fixture: ComponentFixture<MonparcoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonparcoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonparcoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
