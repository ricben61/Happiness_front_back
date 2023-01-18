import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisClientsUpdateComponent } from './avis-clients-update.component';

describe('AvisClientsUpdateComponent', () => {
  let component: AvisClientsUpdateComponent;
  let fixture: ComponentFixture<AvisClientsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvisClientsUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvisClientsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
