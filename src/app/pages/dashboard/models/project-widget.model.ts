export type WidgetTypes = 'progress' | 'task_caunt' | 'deadline';

export interface Widgets {
  type: WidgetTypes;
  name: string;
  width: number;
  height: number;
  checked?: boolean;
  projectId?: number;
}

export interface ProjectWidgets {
  projectId: number;
  widgetList: Widgets[];
}
