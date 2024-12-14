import { Component, Input } from '@angular/core';
import { Project } from '../../../dashboard/models/project.model';
import { ProgressBarComponent } from '../../../../shared/components/progress-bar/progress-bar.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-item',
  template: `
    <div
      class="border p-5 h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer grid grid-cols-2 gap-3"
    >
      <div class="">
        <h2 class="text-4xl font-semibold font-sans">{{ project.name }}</h2>
      </div>
      <div class="flex flex-col items-end">
        <div class="max-w-[150px] w-full">
          <p class="text-gray-400">Начало проекта</p>
          <span>{{ project.startDate }}</span>
        </div>
        <div class="max-w-[150px] w-full">
          <p class="text-gray-400">Конец проекта</p>
          <span>{{ project.endDate }}</span>
        </div>
      </div>
      <div class="flex flex-col justify-between">
        <div class="max-w-[250px] w-full">
          <p class="text-gray-400 text-xl">Завершенные задачи</p>
          <span class="text-2xl">{{ project.tasksCompleted }}</span>
        </div>
        <div class="max-w-[250px] w-full">
          <p class="text-gray-400 text-xl">Всего задач</p>
          <span class="text-2xl">{{ project.tasksTotal }}</span>
        </div>
        <div>
          <button
            [routerLink]="['dashboard']"
            [queryParams]="{ id: project.id }"
            nz-button
            nzType="primary"
          >
            Подробнее
          </button>
        </div>
      </div>
      <div class="flex flex-row justify-end">
        <app-progress-bar
          [data]="[project.tasksCompleted, project.tasksTotal]"
        ></app-progress-bar>
      </div>
    </div>
  `,
  standalone: true,
  imports: [ProgressBarComponent, NzButtonModule, RouterLink],
})
export class ProjectItemComponent {
  @Input()
  project!: Project;
}
