import { Injectable } from '@angular/core';
import { Widgets } from '../models/project-widget.model';

@Injectable({
  providedIn: 'root',
})
export class WidgetMapperService {
  excludeKeysFromWidgets(
    widgets: Widgets[],
    keysToRemove: string[]
  ): Widgets[] {
    return widgets.map((widget) => {
      const mappedWidget = { ...widget } as any;
      keysToRemove.forEach((key) => delete mappedWidget[key]);
      return mappedWidget;
    });
  }
}
