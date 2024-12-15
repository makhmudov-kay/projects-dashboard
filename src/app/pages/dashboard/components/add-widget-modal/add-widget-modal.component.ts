import { Component, inject, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { WidgetMapperService } from '../../services/widget-mapper.service';
import { WidgetService } from '../../services/widget.service';
import { Widgets } from '../../models/project-widget.model';

@Component({
  selector: 'app-add-widget-modal',
  templateUrl: './add-widget-modal.component.html',
  standalone: true,
  imports: [NzCheckboxModule, NzButtonModule],
})
export class AddWidgetModalComponent implements OnInit {
  selectedWidgets: Widgets[] = [];

  readonly widgetList = inject(NZ_MODAL_DATA).widgetList;
  readonly #modal = inject(NzModalRef);
  private widgetService = inject(WidgetService);
  private widgetMapperService = inject(WidgetMapperService);

  ngOnInit(): void {
    this.setInitialSelectedWidgets();
  }

  setInitialSelectedWidgets(): void {
    this.selectedWidgets = this.widgetList.filter(
      (widget: any) => widget.checked
    );
  }

  selectWidget(value: Widgets[]): void {
    this.selectedWidgets = value;
  }

  destroyModal(): void {
    this.#modal.destroy();
  }

  addWidgets(): void {
    const projectId = this.widgetList[0]?.projectId;
    const processedWidgets = this.widgetMapperService.excludeKeysFromWidgets(
      this.selectedWidgets,
      ['checked']
    );

    if (projectId) {
      this.widgetService.updateProjectWidgets(projectId, processedWidgets);
    }

    this.destroyModal();
  }
}
