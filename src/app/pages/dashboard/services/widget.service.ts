import { Injectable } from '@angular/core';
import { LocalStorageUtilit } from '../../../shared/utils/local-storage.utilit';
import {
  ProjectWidgets,
  Widgets,
  WidgetTypes,
} from '../models/project-widget.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WidgetService {
  private readonly storageKey = 'projectWidgets';

  private initialWidgetData = new BehaviorSubject<ProjectWidgets[]>(
    this.getWidgetsFromStorage()
  );

  get storage$() {
    return this.initialWidgetData.asObservable();
  }

  getWidgetsFromStorage(): ProjectWidgets[] {
    const storedData = LocalStorageUtilit.get(this.storageKey);
    return storedData ? JSON.parse(storedData) : [];
  }

  getProjectWidgets(projectId: number): Widgets[] {
    const projectWidgets = this.getWidgetsFromStorage().find(
      (project) => project.projectId === projectId
    );
    return projectWidgets ? projectWidgets.widgetList : [];
  }

  saveWidgetsToStorage(data: ProjectWidgets[]): void {
    LocalStorageUtilit.set(this.storageKey, JSON.stringify(data));
    this.initialWidgetData.next(data);
  }

  updateProjectWidgets(
    projectId: number,
    widgetList: Widgets[],
    widgetType?: WidgetTypes
  ): void {
    const projectWidgets = this.getWidgetsFromStorage();
    const existingProject = projectWidgets.find(
      (project) => project.projectId === projectId
    );

    if (existingProject) {
      existingProject.widgetList = widgetList;
    } else {
      projectWidgets.push({ projectId, widgetList });
    }

    if (widgetType) {
      const widgetList = projectWidgets.find(
        (p) => p.projectId === projectId
      )?.widgetList;
      if (widgetList) {
        const filteredList = widgetList.filter((w) => w.type !== widgetType);
        projectWidgets.forEach((p) => {
          if (p.projectId === projectId) {
            p.widgetList = filteredList;
          }
        });
      }
    }

    this.saveWidgetsToStorage(projectWidgets);
  }
}
