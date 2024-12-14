import { Component, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { LocalStorageUtilit } from '../../../../shared/utils/local-storage.utilit';

@Component({
  selector: 'app-add-widget-modal',
  templateUrl: './add-widget-modal.component.html',
  standalone: true,
  imports: [NzCheckboxModule, NzButtonModule],
})
export class AddWidgetModalComponent {
  selectedWidgets!: any[];

  readonly #modal = inject(NzModalRef);
  readonly widgetList = inject(NZ_MODAL_DATA).widgetList;

  selectWidget(value: any[]): void {
    this.selectedWidgets = value;
  }

  destroyModal(): void {
    this.#modal.destroy();
  }

  addWidgets() {
    const projectWidgets = LocalStorageUtilit.get('projectWidgets')
      ? JSON.parse(LocalStorageUtilit.get('projectWidgets')!)
      : [];

    if (projectWidgets.length) {
      if (
        projectWidgets.includes(
          (item: any) => item.projectId === this.widgetList[0].projectId
        )
      ) {
      }
      const data = projectWidgets.map((item: any) => {
        if (item.projectId === this.widgetList[0].projectId) {
          const clearWidgetObj = this.excludeProjectIdKey();
          item.widgetList.push(...clearWidgetObj);
        }
        return item;
      });
      LocalStorageUtilit.set('projectWidgets', JSON.stringify(data));
    } else {
      const data = [];
      const createWidgetSource = {
        projectId: this.widgetList[0].projectId,
        widgetList: this.excludeProjectIdKey(),
      };
      data.push(createWidgetSource);
      LocalStorageUtilit.set('projectWidgets', JSON.stringify(data));
    }

    this.destroyModal();
  }

  private excludeProjectIdKey() {
    return this.selectedWidgets.map((item) => {
      delete item.projectId;
      const list = item;
      delete list.projectId;
      return {
        ...list,
      };
    });
  }
}
