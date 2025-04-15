import { Routes } from '@angular/router';
import { RegisterCarComponent } from './pages/register-car/register-car.component';
import { DamageCanvasComponent } from './pages/damage-canvas/damage-canvas.component';
import { CarInspectionComponent } from './pages/car-inspection/car-inspection.component';
import { RegisterClientComponent } from './pages/register-client/register-client.component';

export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'register', component: RegisterClientComponent },
  { path: 'register-car', component: RegisterCarComponent },
  { path: 'damage-registration', component: DamageCanvasComponent },
  { path: 'car-inspection', component: CarInspectionComponent },
];
