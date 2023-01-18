import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutilsEtMethodesComponent } from './outils-et-methodes.component';

describe('OutilsEtMethodesComponent', () => {
  let component: OutilsEtMethodesComponent;
  let fixture: ComponentFixture<OutilsEtMethodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutilsEtMethodesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutilsEtMethodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
