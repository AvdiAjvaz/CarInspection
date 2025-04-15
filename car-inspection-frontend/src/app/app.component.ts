import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegisterCarComponent } from './pages/register-car/register-car.component';
import { DamageCanvasComponent } from './pages/damage-canvas/damage-canvas.component';
import { CarInspectionComponent } from './pages/car-inspection/car-inspection.component';
import { RegisterClientComponent } from './pages/register-client/register-client.component';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    RegisterClientComponent,
    CommonModule,
    RegisterCarComponent,
    DamageCanvasComponent,
    CarInspectionComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Car Inspection';
}
