import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { CarService } from '../../services/car-inspection.service';
import { DamageService } from '../../services/damage.service';
import { ClientService } from '../../services/client.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-damages',
  standalone: true,
  templateUrl: './car-inspection.component.html',
  styleUrls: ['./car-inspection.component.scss'],
  imports: [CommonModule],
})
export class CarInspectionComponent implements OnInit, AfterViewInit {
  cars: any[] = [];
  selectedDamages: any[] = [];
  selectedCarId: number | null = null;
  isLoading = false;
  selectedClient: any[] = [];
  clientId: number | null = null;
  selectedDamageImage: any = null;

  @ViewChild('damageCanvas', { static: false })
  damageCanvas!: ElementRef<HTMLCanvasElement>;

  @ViewChild('damageImage', { static: false })
  damageImage!: ElementRef<HTMLImageElement>;

  constructor(
    private carService: CarService,
    private damageService: DamageService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.loadCars();
  }

  ngAfterViewInit(): void {
    if (this.damageImage && this.damageCanvas) {
      this.drawDamageCircle(this.selectedDamageImage);
    }
  }

  loadClientById(clientId: number): void {
    this.clientService.GetClientById(1).subscribe({
      next: (data: any[]) => {
        this.selectedClient = data;
        console.log('Klienti:', this.selectedClient);
      },
      error: (err: any[]) => {
        console.error('Error while fetching client:', err);
      },
    });
  }

  loadCars(): void {
    this.carService.getAllCars().subscribe({
      next: (data: any[]) => {
        this.cars = data;
      },
      error: (err: any) => {
        console.error('Error while fetching cars:', err);
      },
    });
  }

  showDamages(carId: number): void {
    this.selectedCarId = carId;
    this.isLoading = true;
    this.damageService.getDamagesByCar(carId).subscribe({
      next: (damages) => {
        this.selectedDamages = damages.map((damage: any) => ({
          ...damage,
          statusDescription: damage.status ? 'Rregulluar' : 'E pa rregulluar',
        }));
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Gabim gjatë marrjes së dëmtimeve:', err);
        this.isLoading = false;
      },
    });
  }

  viewDamageImage(damage: any): void {
    this.selectedDamageImage = damage;

    const image = this.damageImage.nativeElement;

    image.onload = () => {
      this.drawDamageCircle(damage);
    };

    if (image.complete) {
      this.drawDamageCircle(damage);
    }
  }

  drawDamageCircle(damage: any): void {
    const canvas = this.damageCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    const image = this.damageImage.nativeElement;

    if (!ctx || !canvas || !image) {
      console.error('Canvas or Image element is not available');
      return;
    }

    canvas.width = image.clientWidth;
    canvas.height = image.clientHeight;

    const isNormalized = damage.x <= 1 && damage.y <= 1;
    let x = isNormalized ? damage.x * canvas.width : damage.x;
    let y = isNormalized ? damage.y * canvas.height : damage.y;

    x = x + 0.4 * canvas.width;
    y = y + 0.35 * canvas.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
    ctx.fill();

    ctx.font = '14px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(damage.pershkrimi || '', x + 10, y - 10);

    console.log('Canvas size:', canvas.width, canvas.height);
    console.log('Koordinatat e dëmtimit:', { x, y });
  }

  onImageLoaded(): void {
    if (this.selectedDamageImage) {
      this.drawDamageCircle(this.selectedDamageImage);
    }
  }
}
