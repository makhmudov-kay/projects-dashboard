import { Component, HostListener, OnInit } from '@angular/core';
import { WidgetComponent } from '../../../../shared/components/widget/widget.component';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddWidgetModalComponent } from '../add-widget-modal/add-widget-modal.component';
import { ActivatedRoute } from '@angular/router';
import { NgDestroy } from '../../../../shared/services/ng-destroy.service';
import { takeUntil } from 'rxjs';
import { WidgetService } from '../../services/widget.service';
import { Widgets, WidgetTypes } from '../../models/project-widget.model';
import { ResizeService } from '../../services/resize.service';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
  standalone: true,
  imports: [
    WidgetComponent,
    DragDropModule,
    NzIconModule,
    NzButtonModule,
    NzDividerModule,
    NzResultModule,
  ],
  providers: [NzModalService, NgDestroy],
})
export class ProjectDetailComponent implements OnInit {
  projectId!: number;
  projectData!: Project;
  projectWidgets!: Widgets[];
  widgetList: Widgets[] = [
    {
      type: 'progress',
      name: 'Виджет - Прогресс выполнения',
      width: 100,
      height: 180,
    },
    {
      type: 'task_caunt',
      name: 'Виджет - Количество задач',
      width: 100,
      height: 180,
    },
    {
      type: 'deadline',
      name: 'Виджет - Сроки завершения',
      width: 100,
      height: 180,
    },
  ];

  constructor(
    private modal: NzModalService,
    private route: ActivatedRoute,
    private destroy$: NgDestroy,
    private widget$: WidgetService,
    private resizeService: ResizeService,
    private project$: ProjectService
  ) {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.projectId = +params['id'];
        this.projectWidgets = this.widget$.getProjectWidgets(this.projectId);
        this.getProjectById(this.projectId);
      });
  }

  private getProjectById(projectId: number) {
    this.project$
      .getProjects()
      .pipe(takeUntil(this.destroy$))
      .subscribe((project) => {
        this.projectData = project.filter((p) => p.id === projectId)[0];
      });
  }

  ngOnInit(): void {
    this.widget$.storage$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.projectWidgets = this.widget$.getProjectWidgets(this.projectId);
    });
  }

  createComponentModal(): void {
    const projectWidgets = this.widget$.getWidgetsFromStorage();
    const updatedWidgetList = this.widgetList.map((widget) => ({
      ...widget,
      projectId: this.projectId,
      checked: projectWidgets.some(
        (project) =>
          project.projectId === this.projectId &&
          project.widgetList.some((w) => w.type === widget.type)
      ),
    }));

    this.modal.create<AddWidgetModalComponent>({
      nzTitle: 'Список виджетов',
      nzContent: AddWidgetModalComponent,
      nzData: { widgetList: updatedWidgetList },
      nzWidth: 300,
      nzFooter: null,
      nzClosable: false,
      nzMaskClosable: false,
    });
  }

  removeWidget(
    widgetType: WidgetTypes,
    projectId: number,
    projectWidgets: Widgets[]
  ) {
    this.widget$.updateProjectWidgets(projectId, projectWidgets, widgetType);
  }

  drop(event: CdkDragDrop<Widgets[]>): void {
    moveItemInArray(
      this.projectWidgets,
      event.previousIndex,
      event.currentIndex
    );
  }

  onResizeStart(event: MouseEvent, widget: Widgets): void {
    this.resizeService.startResize(event, widget);
  }

  @HostListener('window:mousemove', ['$event'])
  onResize(event: MouseEvent): void {
    const parentWidth = (document.querySelector('.drag-list') as HTMLElement)
      ?.clientWidth;
    if (parentWidth) {
      const newWidth = this.resizeService.onResize(event, parentWidth);
      if (newWidth !== null) {
        this.projectWidgets.find(
          (w) => w.type === this.resizeService['currentBox']?.type
        )!.width = newWidth;
      }
    }
  }

  @HostListener('window:mouseup')
  onResizeEnd(): void {
    this.resizeService.endResize();
  }
}
