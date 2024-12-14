import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css'],
  standalone: true,
  imports: [],
})
export class WidgetComponent {
  @Input()
  value!: string
}
