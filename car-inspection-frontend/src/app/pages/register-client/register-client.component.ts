import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-client',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-client.component.html',
  styleUrl: './register-client.component.scss',
})
export class RegisterClientComponent {
  clientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router
  ) {
    this.clientForm = this.fb.group({
      emri: ['', Validators.required],
      mbiemri: ['', Validators.required],
      numri_i_telefonit: ['', [Validators.required]],
    });
  }

  onSubmit() {
    console.log('Forma u submit-u');
    if (this.clientForm.valid) {
      this.clientService.registerClient(this.clientForm.value).subscribe({
        next: (res) => {
          alert('Klienti u regjistrua me sukses!');
          this.router.navigate(['/register'], { state: { clientId: res.id } });
        },
        error: (err) => {
          console.error('Gabim:', err);
          alert('Gabim gjatë regjistrimit!');
        },
      });
    } else {
      console.log('Forma jo valide:', this.clientForm.errors);
    }
  }
}
