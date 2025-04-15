import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CarService } from '../../services/car.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-car',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-car.component.html',
  styleUrl: './register-car.component.scss',
})
export class RegisterCarComponent {
  carForm: FormGroup;
  clientId: number;
  // selectedColor = '#ffffff';

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private router: Router,
    private location: Location
  ) {
    const navState: any = this.location.getState();
    this.clientId = navState?.clientId;

    this.carForm = this.fb.group({
      lloji: ['', Validators.required],
      ngjyra: ['', Validators.required],
      nr_targave: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.carForm.valid) {
      const payload = {
        ...this.carForm.value,
        clientId: this.clientId,
      };
      this.carService.registerCar(payload).subscribe({
        next: (res) => {
          alert('Vetura u regjistrua me sukses!');
          // Mund të vazhdojmë në regjistrimin e dëmtimeve më pas
          this.router.navigate(['/inspection'], { state: { carId: res.id } });
        },
        error: (err) => {
          alert('Gabim gjatë regjistrimit të veturës!');
        },
      });
    }
  }
}
