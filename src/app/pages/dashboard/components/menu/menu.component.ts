import { Component, inject, Input, OnInit } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { Project } from '../../models/project.model';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  template: `
    <ul nz-menu nzMode="inline" class="h-full">
      @for(project of projects; track project.id) {
      <li
        nz-menu-item
        nz-tooltip
        nzTooltipPlacement="right"
        [nzSelected]="prjectId === project.id"
        routerLink="/dashboard"
        [queryParams]="{ id: project.id }"
      >
        <span nz-icon nzType="fund-projection-screen" nzTheme="outline"></span>
        <span>{{ project.name }}</span>
      </li>
      }
    </ul>
  `,
  standalone: true,
  imports: [NzIconModule, NzMenuModule, RouterLink],
})
export class MenuComponent {
  @Input()
  projects!: Project[];

  prjectId = Number(inject(ActivatedRoute).snapshot.queryParams['id']);
}
