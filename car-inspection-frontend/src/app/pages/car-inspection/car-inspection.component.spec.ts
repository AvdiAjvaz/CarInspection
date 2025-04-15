import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarInspectionComponent } from './car-inspection.component';

describe('CarInspectionComponent', () => {
  let component: CarInspectionComponent;
  let fixture: ComponentFixture<CarInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarInspectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
