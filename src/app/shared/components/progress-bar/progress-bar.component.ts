import { Component, Input } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
  standalone: true,
  imports: [BaseChartDirective],
})
export class ProgressBarComponent {
  private _data!: [number, number];
  public get data(): [number, number] {
    return this._data;
  }
  @Input()
  public set data(v: [number, number]) {
    this._data = v;
    this.doughnutChartData.datasets[0].data = v;
  }

  private _displayLegend!: boolean;
  public get displayLegend(): boolean {
    return this._displayLegend;
  }
  @Input()
  public set displayLegend(v: boolean) {
    this._displayLegend = v;
    this.doughnutChartOptions.plugins.legend.display = v;
  }

  public doughnutChartLabels: string[] = ['Завершенные задачи', 'Всего задач'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{ data: [450, 100] }],
  };
  public doughnutChartType: ChartType = 'doughnut';

  public doughnutChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: this.displayLegend,
      },
    },
  };
}
