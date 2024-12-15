import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResizeService {
  private resizing = false;
  private startX = 0;
  private initialWidth = 0;
  private currentBox: any = null;

  startResize(event: MouseEvent, box: any): void {
    this.resizing = true;
    this.currentBox = box;
    this.startX = event.clientX;
    this.initialWidth = box.width;
    event.stopPropagation();
  }

  onResize(event: MouseEvent, parentWidth: number): number | null {
    if (this.resizing && this.currentBox) {
      const delta = event.clientX - this.startX;
      const deltaPercent = (delta / parentWidth) * 100;
      let newWidth = this.initialWidth + deltaPercent;
      newWidth = Math.max(10, Math.min(newWidth, 100));
      return newWidth;
    }
    return null;
  }

  endResize(): void {
    this.resizing = false;
    this.currentBox = null;
  }
}
