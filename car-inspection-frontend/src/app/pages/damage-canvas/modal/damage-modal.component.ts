import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-damage-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-header bg-dark text-white">
      <h5 class="modal-title" style="margin-left:30%">Regjistro Dëmtimin</h5>
      <button
        type="button"
        class="btn-close btn-light text-white"
        (click)="onCancel()"
        aria-label="Close"
      ></button>
    </div>
    <div class="modal-body">
      <p><strong>Pamja:</strong> {{ data.view }}</p>
      <div class="mb-3">
        <label for="pershkrimi" class="form-label">Përshkrimi:</label>
        <textarea
          id="pershkrimi"
          [(ngModel)]="pershkrimi"
          class="form-control"
          required
          rows="4"
          placeholder="Shkruani përshkrimin e dëmtimit"
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="shkalla" class="form-label">Shkalla e dëmtimit:</label>
        <select
          id="shkalla"
          [(ngModel)]="shkalla_e_demtimit"
          class="form-select"
          required
        >
          <option value="E lehtë">E lehtë</option>
          <option value="Mesatare">Mesatare</option>
          <option value="E rëndë">E rëndë</option>
        </select>
      </div>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-secondary"
        (click)="onCancel()"
        style="margin-right: 15%"
      >
        Anulo
      </button>
      <button
        type="button"
        class="btn btn-success"
        (click)="onSubmit()"
        [disabled]="!pershkrimi || !shkalla_e_demtimit"
        style="margin-right: 15%"
      >
        Ruaj
      </button>
    </div>
  `,
  styles: [
    `
      .modal-header {
        border-bottom: 2px solidrgb(49, 55, 60);
      }
      .modal-title {
        font-size: 1.25rem;
        font-weight: 600;
      }
      .modal-body {
        background-color: #f8f9fa;
        border-radius: 10px;
        padding: 20px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
      }
      .modal-footer {
        display: flex;
        justify-content: flex-end;
        border-top: 1px solid #e0e0e0;
      }
      .btn-close {
        font-size: 1.5rem;
        background: none;
        border: none;
      }
      textarea.form-control {
        resize: vertical;
        border-radius: 8px;
        box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
      }
      select.form-select {
        border-radius: 8px;
        box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
      }
      .btn {
        min-width: 120px;
        font-weight: 500;
        border-radius: 5px;
      }
      .btn-secondary {
        background-color: #6c757d;
        border: none;
      }
      .btn-primary {
        background-color: #007bff;
        border: none;
      }
      .btn:hover {
        opacity: 0.9;
      }
    `,
  ],
})
export class DamageModalComponent {
  pershkrimi: string = '';
  shkalla_e_demtimit: string = '';

  constructor(
    public dialogRef: MatDialogRef<DamageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close({
      pershkrimi: this.pershkrimi,
      shkalla_e_demtimit: this.shkalla_e_demtimit,
    });
  }
}
