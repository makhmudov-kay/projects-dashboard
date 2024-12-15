import { Component, Input } from '@angular/core';
import { Widgets } from '../../../pages/dashboard/models/project-widget.model';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { Project } from '../../../pages/dashboard/models/project.model';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css'],
  standalone: true,
  imports: [ProgressBarComponent],
})
export class WidgetComponent {
  @Input()
  widget!: Widgets;

  @Input()
  projectData!: Project;
}
