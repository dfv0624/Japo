import {
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  signal,
  untracked,
  viewChild
} from '@angular/core';
import { SpeechService } from '../../../services/speech.service';
import { KANA_WRITING_TIPS } from '../../../data/writing-data';

interface StrokePoint {
  x: number;
  y: number;
}

interface CanvasStroke {
  width: number;
  points: StrokePoint[];
}

@Component({
  selector: 'app-writing-canvas',
  template: `
    <div class="canvas-wrapper">
      <!-- Top Controls -->
      <div class="canvas-toolbar">
        <div class="mode-pills" role="group" aria-label="Modo del cuaderno de trazo">
          <button
            type="button"
            class="tool-pill"
            [class.active]="canvasMode() === 'char'"
            (click)="setCanvasMode('char')">
            <span class="material-symbols-outlined">crop_square</span>
            Carácter por carácter
          </button>
          <button
            type="button"
            class="tool-pill"
            [class.active]="canvasMode() === 'word'"
            (click)="setCanvasMode('word')">
            <span class="material-symbols-outlined">text_fields</span>
            Frase completa
          </button>
        </div>

        <div class="tool-actions">
          <button
            type="button"
            class="tool-pill"
            [class.active]="showGuide()"
            (click)="toggleGuide()"
            [attr.aria-pressed]="showGuide()">
            <span class="material-symbols-outlined">
              {{ showGuide() ? 'visibility' : 'visibility_off' }}
            </span>
            {{ showGuide() ? 'Guía visible' : 'Sin guía' }}
          </button>

          <button
            type="button"
            class="audio-btn"
            (click)="speechService.speak(targetKana())"
            title="Escuchar pronunciación"
            aria-label="Escuchar pronunciación">
            <span class="material-symbols-outlined">volume_up</span>
          </button>
        </div>
      </div>

      <!-- Character Selector Strip when in char mode -->
      @if (canvasMode() === 'char' && practiceChars().length > 0) {
        <div class="char-selector-bar" role="group" aria-label="Seleccionar carácter para trazar">
          <span class="selector-label">Toca un carácter para practicarlo:</span>
          <div class="char-chips">
            @for (ch of practiceChars(); track $index) {
              <button
                type="button"
                class="char-chip jp-serif"
                [class.active]="selectedCharIndex() === $index"
                (click)="selectChar($index)"
                [attr.aria-label]="'Practicar carácter ' + ch">
                {{ ch }}
              </button>
            }
          </div>
        </div>
      }

      <!-- Main Drawing Stage -->
      <div class="canvas-stage">
        <div class="target-summary">
          <span class="target-reading jp-serif">
            {{ canvasMode() === 'char' ? currentChar() : cleanWordText() }}
          </span>
          @if (targetRomaji() || targetMeaning()) {
            <span class="target-meta">
              @if (targetRomaji()) {
                <span class="meta-romaji">{{ targetRomaji() }}</span>
              }
              @if (targetMeaning()) {
                <span class="meta-meaning">— {{ targetMeaning() }}</span>
              }
            </span>
          }
        </div>

        <div class="canvas-frame" [class.word-frame]="canvasMode() === 'word'">
          <canvas
            #drawCanvas
            class="drawing-canvas"
            [attr.aria-label]="'Lienzo de práctica de caligrafía para ' + (canvasMode() === 'char' ? currentChar() : cleanWordText())"
            (pointerdown)="onPointerDown($event)"
            (pointermove)="onPointerMove($event)"
            (pointerup)="onPointerUp($event)"
            (pointercancel)="onPointerUp($event)">
          </canvas>
        </div>

        <!-- Stroke Tips for single character -->
        @if (canvasMode() === 'char' && currentCharTip()) {
          <div class="stroke-tip-box">
            <span class="material-symbols-outlined tip-icon">brush</span>
            <div>
              <strong>Consejo de trazo para 「{{ currentChar() }}」:</strong>
              <span>{{ currentCharTip() }}</span>
            </div>
          </div>
        }
      </div>

      <!-- Bottom Brush & Clear Bar -->
      <div class="canvas-footer">
        <div class="brush-sizes" role="group" aria-label="Grosor del trazo">
          <span class="brush-label">Grosor:</span>
          <button
            type="button"
            class="brush-btn"
            [class.active]="strokeWidth() === 4"
            (click)="setStrokeWidth(4)">
            Fino
          </button>
          <button
            type="button"
            class="brush-btn"
            [class.active]="strokeWidth() === 7"
            (click)="setStrokeWidth(7)">
            Medio
          </button>
          <button
            type="button"
            class="brush-btn"
            [class.active]="strokeWidth() === 11"
            (click)="setStrokeWidth(11)">
            Pincel
          </button>
        </div>

        <div class="canvas-clear-actions">
          <button
            type="button"
            class="btn-secondary"
            [disabled]="strokes().length === 0"
            (click)="undoStroke()">
            <span class="material-symbols-outlined">undo</span>
            Deshacer trazo
          </button>
          <button
            type="button"
            class="btn-secondary"
            [disabled]="strokes().length === 0"
            (click)="clearCanvas()">
            <span class="material-symbols-outlined">delete_sweep</span>
            Limpiar cuaderno
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrl: './writing-canvas.component.css'
})
export class WritingCanvasComponent {
  protected readonly speechService = inject(SpeechService);

  readonly targetKana = input.required<string>();
  readonly targetRomaji = input<string>('');
  readonly targetMeaning = input<string>('');

  readonly drawCanvas = viewChild<ElementRef<HTMLCanvasElement>>('drawCanvas');

  readonly canvasMode = signal<'char' | 'word'>('char');
  readonly selectedCharIndex = signal<number>(0);
  readonly showGuide = signal<boolean>(true);
  readonly strokeWidth = signal<number>(7);
  readonly strokes = signal<CanvasStroke[]>([]);

  private isDrawing = false;
  private activeStroke: CanvasStroke | null = null;

  readonly cleanWordText = computed(() => {
    return this.targetKana().replace(/[\s\u3000。、.,?？!！]/g, '');
  });

  readonly practiceChars = computed<string[]>(() => {
    const clean = this.cleanWordText();
    return Array.from(clean);
  });

  readonly currentChar = computed<string>(() => {
    const chars = this.practiceChars();
    if (chars.length === 0) return 'あ';
    const idx = Math.min(this.selectedCharIndex(), chars.length - 1);
    return chars[idx] ?? chars[0];
  });

  readonly currentCharTip = computed<string | null>(() => {
    const ch = this.currentChar();
    return KANA_WRITING_TIPS[ch] ?? null;
  });

  constructor() {
    // Reiniciar selección y trazos cuando cambia el ejercicio objetivo
    effect(() => {
      this.targetKana();
      untracked(() => {
        this.selectedCharIndex.set(0);
        this.strokes.set([]);
      });
    });

    // Redibujar lienzo ante cualquier cambio visual o de trazos
    effect(() => {
      const canvasRef = this.drawCanvas();
      const mode = this.canvasMode();
      const ch = this.currentChar();
      const word = this.cleanWordText();
      const guide = this.showGuide();
      const currentStrokes = this.strokes();

      if (!canvasRef) return;
      this.renderCanvas(canvasRef.nativeElement, mode, ch, word, guide, currentStrokes);
    });
  }

  setCanvasMode(mode: 'char' | 'word'): void {
    this.canvasMode.set(mode);
    this.strokes.set([]);
  }

  selectChar(index: number): void {
    this.selectedCharIndex.set(index);
    this.strokes.set([]);
  }

  toggleGuide(): void {
    this.showGuide.update(v => !v);
  }

  setStrokeWidth(width: number): void {
    this.strokeWidth.set(width);
  }

  undoStroke(): void {
    this.strokes.update(list => list.slice(0, -1));
  }

  clearCanvas(): void {
    this.strokes.set([]);
  }

  onPointerDown(event: PointerEvent): void {
    const canvas = this.drawCanvas()?.nativeElement;
    if (!canvas) return;

    canvas.setPointerCapture(event.pointerId);
    const point = this.getRelativePoint(canvas, event);
    this.isDrawing = true;
    this.activeStroke = {
      width: this.strokeWidth(),
      points: [point]
    };

    this.drawLiveDot(canvas, point, this.strokeWidth());
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.isDrawing || !this.activeStroke) return;
    const canvas = this.drawCanvas()?.nativeElement;
    if (!canvas) return;

    const point = this.getRelativePoint(canvas, event);
    const points = this.activeStroke.points;
    const prev = points[points.length - 1];
    points.push(point);

    if (prev) {
      this.drawLiveSegment(canvas, prev, point, this.activeStroke.width);
    }
  }

  onPointerUp(event: PointerEvent): void {
    if (!this.isDrawing || !this.activeStroke) return;
    const canvas = this.drawCanvas()?.nativeElement;
    if (canvas && canvas.hasPointerCapture(event.pointerId)) {
      canvas.releasePointerCapture(event.pointerId);
    }

    const finished = this.activeStroke;
    this.isDrawing = false;
    this.activeStroke = null;
    this.strokes.update(list => [...list, finished]);
  }

  private getRelativePoint(canvas: HTMLCanvasElement, event: PointerEvent): StrokePoint {
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  private drawLiveDot(canvas: HTMLCanvasElement, point: StrokePoint, width: number): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.save();
    ctx.fillStyle = '#121212';
    ctx.beginPath();
    ctx.arc(point.x, point.y, width / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  private drawLiveSegment(
    canvas: HTMLCanvasElement,
    from: StrokePoint,
    to: StrokePoint,
    width: number
  ): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.save();
    ctx.strokeStyle = '#121212';
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    ctx.restore();
  }

  private renderCanvas(
    canvas: HTMLCanvasElement,
    mode: 'char' | 'word',
    singleChar: string,
    wordText: string,
    guideVisible: boolean,
    strokesList: CanvasStroke[]
  ): void {
    const cssWidth = mode === 'char' ? 280 : 620;
    const cssHeight = mode === 'char' ? 280 : 190;
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;

    canvas.width = Math.round(cssWidth * dpr);
    canvas.height = Math.round(cssHeight * dpr);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssWidth, cssHeight);

    // Fondo blanco de papel japonés
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, cssWidth, cssHeight);

    // Cuadrícula guía (Genkouyoushi)
    ctx.save();
    ctx.strokeStyle = '#DCDCDC';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);

    if (mode === 'char') {
      ctx.beginPath();
      ctx.moveTo(cssWidth / 2, 0);
      ctx.lineTo(cssWidth / 2, cssHeight);
      ctx.moveTo(0, cssHeight / 2);
      ctx.lineTo(cssWidth, cssHeight / 2);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.moveTo(0, cssHeight / 2);
      ctx.lineTo(cssWidth, cssHeight / 2);
      ctx.stroke();
    }
    ctx.restore();

    // Carácter o palabra guía fantasma
    if (guideVisible) {
      const textToDraw = mode === 'char' ? singleChar : wordText;
      ctx.save();
      ctx.fillStyle = 'rgba(18, 18, 18, 0.13)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      let fontSize = mode === 'char' ? 186 : 64;
      if (mode === 'word' && textToDraw.length > 8) {
        fontSize = Math.max(30, Math.floor(540 / textToDraw.length));
      }
      ctx.font = `500 ${fontSize}px "Shippori Mincho", "Hiragino Mincho ProN", serif`;
      ctx.fillText(textToDraw, cssWidth / 2, cssHeight / 2 + 4);
      ctx.restore();
    }

    // Re-dibujar trazos guardados
    for (const stroke of strokesList) {
      if (stroke.points.length === 0) continue;
      ctx.save();
      ctx.strokeStyle = '#121212';
      ctx.fillStyle = '#121212';
      ctx.lineWidth = stroke.width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (stroke.points.length === 1) {
        const pt = stroke.points[0];
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, stroke.width / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        for (let i = 1; i < stroke.points.length; i += 1) {
          ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
        }
        ctx.stroke();
      }
      ctx.restore();
    }
  }
}

