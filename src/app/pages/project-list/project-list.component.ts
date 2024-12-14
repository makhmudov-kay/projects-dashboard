import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../dashboard/components/breadcrumb/breadcrumb.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { ProjectItemComponent } from './components/project-item/project-item.component';
import { LocalStorageUtilit } from '../../shared/utils/local-storage.utilit';
import { Project } from '../dashboard/models/project.model';

@Component({
  selector: 'app-project-list',
  template: `
    <app-breadcrumb></app-breadcrumb>
    <nz-layout class="mb-12 bg-white py-6 h-[85%]">
      <nz-content class="px-6 h-full grid grid-cols-2 gap-7">
        @for(project of projects; track project.id) {
        <app-project-item [project]="project"></app-project-item>
        }
      </nz-content>
    </nz-layout>
  `,
  standalone: true,
  imports: [BreadcrumbComponent, NzLayoutModule, ProjectItemComponent],
})
export class ProjectListComponent {
  get projects(): Project[] {
    return LocalStorageUtilit.get('projects')
      ? JSON.parse(LocalStorageUtilit.get('projects')!)
      : [];
  }
}
