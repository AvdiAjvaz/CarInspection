import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DamageService } from '../../services/damage.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DamageModalComponent } from './modal/damage-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-damage-canvas',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './damage-canvas.component.html',
  styleUrls: ['./damage-canvas.component.scss'],
})
export class DamageCanvasComponent implements AfterViewInit {
  @ViewChild('topCanvas') topCanvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('leftCanvas') leftCanvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('frontCanvas') frontCanvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('rightCanvas') rightCanvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('backCanvas') backCanvasRef!: ElementRef<HTMLCanvasElement>;

  @ViewChild('topImage') topImageRef!: ElementRef<HTMLImageElement>;
  @ViewChild('leftImage') leftImageRef!: ElementRef<HTMLImageElement>;
  @ViewChild('frontImage') frontImageRef!: ElementRef<HTMLImageElement>;
  @ViewChild('rightImage') rightImageRef!: ElementRef<HTMLImageElement>;
  @ViewChild('backImage') backImageRef!: ElementRef<HTMLImageElement>;

  carId: number;
  canvasContexts: { [key: string]: CanvasRenderingContext2D } = {};

  constructor(
    private damageService: DamageService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.carId = history.state.carId;
    if (!this.carId) {
      this.router.navigate(['/some-fallback-route']);
    }
  }

  ngAfterViewInit() {
    this.setupCanvas('top', this.topCanvasRef, this.topImageRef);
    this.setupCanvas('left', this.leftCanvasRef, this.leftImageRef);
    this.setupCanvas('front', this.frontCanvasRef, this.frontImageRef);
    this.setupCanvas('right', this.rightCanvasRef, this.rightImageRef);
    this.setupCanvas('back', this.backCanvasRef, this.backImageRef);
  }

  private setupCanvas(
    view: string,
    canvasRef: ElementRef<HTMLCanvasElement>,
    imageRef: ElementRef<HTMLImageElement>
  ) {
    const canvas = canvasRef.nativeElement;
    const image = imageRef.nativeElement;

    const resizeAndInit = () => {
      this.initializeCanvas(canvas, image, view);
    };

    if (image.complete) {
      resizeAndInit();
    } else {
      image.onload = resizeAndInit;
      image.onerror = () => {
        console.error(`Failed to load ${view} image`);
        this.snackBar.open(`Gabim në ngarkimin e imazhit ${view}`, 'Mbylle', {
          duration: 3000,
        });
      };
    }

    const wrapper = canvas.parentElement;
    if (wrapper) {
      const observer = new ResizeObserver(() => resizeAndInit());
      observer.observe(wrapper);
    }
  }

  private initializeCanvas(
    canvas: HTMLCanvasElement,
    image: HTMLImageElement,
    view: string
  ) {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error(`Could not get 2D context for ${view} canvas`);
      return;
    }

    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0);

    this.canvasContexts[view] = ctx;
  }

  async onCanvasClick(event: MouseEvent, view: string) {
    const canvas = this.getCanvasByView(view);
    if (!canvas) return;

    const ctx = this.canvasContexts[view];
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    const dialogRef = this.dialog.open(DamageModalComponent, {
      width: '400px',
      data: { view },
    });

    const result = await dialogRef.afterClosed().toPromise();
    if (!result || !result.pershkrimi || !result.shkalla_e_demtimit) return;

    const bounds = canvas.getBoundingClientRect();
    const pixelX = (x / 100) * bounds.width;
    const pixelY = (y / 100) * bounds.height;

    const scaleX = canvas.width / bounds.width;
    const scaleY = canvas.height / bounds.height;

    ctx.beginPath();
    ctx.arc(pixelX * scaleX, pixelY * scaleY, 8, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();

    const damageData = {
      x,
      y,
      pershkrimi: result.pershkrimi,
      carId: this.carId,
      view,
      status: false,
      shkalla_e_demtimit: result.shkalla_e_demtimit,
      date: new Date().toISOString(),
    };

    this.damageService.registerDamage(damageData).subscribe({
      next: () => console.log('Dëmtimi u regjistrua!'),
      error: (err) => console.error('Gabim gjatë regjistrimit:', err),
    });
  }

  private getCanvasByView(view: string): HTMLCanvasElement | null {
    switch (view) {
      case 'top':
        return this.topCanvasRef?.nativeElement;
      case 'left':
        return this.leftCanvasRef?.nativeElement;
      case 'front':
        return this.frontCanvasRef?.nativeElement;
      case 'right':
        return this.rightCanvasRef?.nativeElement;
      case 'back':
        return this.backCanvasRef?.nativeElement;
      default:
        return null;
    }
  }
}
