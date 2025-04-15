import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamageCanvasComponent } from './damage-canvas.component';

describe('DamageInspectionComponent', () => {
  let component: DamageCanvasComponent;
  let fixture: ComponentFixture<DamageCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DamageCanvasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DamageCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
