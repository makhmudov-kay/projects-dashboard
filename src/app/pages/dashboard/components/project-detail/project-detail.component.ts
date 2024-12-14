import {
  Component,
  HostListener,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
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
import {
  NzModalRef,
  NzModalService,
  NZ_MODAL_DATA,
  NzModalModule,
} from 'ng-zorro-antd/modal';
import { AddWidgetModalComponent } from '../add-widget-modal/add-widget-modal.component';
import { ActivatedRoute } from '@angular/router';
import { NgDestroy } from '../../../../shared/services/ng-destroy.service';
import { takeUntil } from 'rxjs';

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
  items = [
    { name: 'Блок 1', width: 100, height: 100 },
    { name: 'Блок 2', width: 100, height: 100 },
    { name: 'Блок 3', width: 100, height: 100 },
  ];

  widgetList = [
    { type: 'progress', name: 'Виджет - Прогресс выполнения' },
    { type: 'task_caunt', name: 'Виджет - Количество задач' },
    { type: 'deadline', name: 'Виджет - Сроки завершения' },
  ];

  projectId!: number;

  constructor(
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private route: ActivatedRoute,
    private destroy$: NgDestroy
  ) {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.projectId = +params['id'];
      });
  }

  createComponentModal(): void {
    this.widgetList = this.widgetList.map((item) => {
      return {
        ...item,
        projectId: this.projectId,
      };
    });

    this.modal.create<AddWidgetModalComponent>({
      nzTitle: 'Список виджетов',
      nzContent: AddWidgetModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzData: {
        widgetList: this.widgetList,
      },
      nzWidth: 300,
      nzFooter: null,
      nzClosable: false,
      nzMaskClosable: false,
    });
  }

  addSelectedWidget(addSelectedWidget: any) {
    console.log(addSelectedWidget);
  }

  ngOnInit(): void {
    console.log(`12`);
  }

  resizing = false;
  currentBox: any = null;
  initialWidth = 0;
  startX = 0;

  drop(event: CdkDragDrop<string[]> | any) {
    if (!this.resizing) {
      moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    }
  }

  onResizeStart(event: MouseEvent, box: any) {
    this.resizing = true;
    this.currentBox = box;
    this.startX = event.clientX;
    this.initialWidth = box.width;
    event.stopPropagation();
  }

  @HostListener('window:mousemove', ['$event'])
  onResize(event: MouseEvent) {
    if (this.resizing && this.currentBox) {
      const parentWidth = (document.querySelector('.drag-list') as HTMLElement)
        ?.clientWidth;

      if (parentWidth) {
        const delta = event.clientX - this.startX;
        const deltaPercent = (delta / parentWidth) * 100;
        let newWidth = this.initialWidth + deltaPercent;
        newWidth = Math.max(10, Math.min(newWidth, 100));
        this.currentBox.width = newWidth;
      }
    }
  }

  @HostListener('window:mouseup')
  onResizeEnd() {
    this.resizing = false;
    this.currentBox = null;
  }
}
