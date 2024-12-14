import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { delay, Observable, tap } from 'rxjs';
import { Project } from './pages/dashboard/models/project.model';
import { ProjectService } from './pages/dashboard/services/project.service';
import { AsyncPipe } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { LocalStorageUtilit } from './shared/utils/local-storage.utilit';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NzLayoutModule, AsyncPipe, NzSpinModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  $projects!: Observable<Project[]>;

  private projects$ = inject(ProjectService);

  ngOnInit() {
    this.getProjectsData();
  }

  getProjectsData() {
    this.$projects = this.projects$.getProjects().pipe(
      delay(1500),
      tap((data) => {
        LocalStorageUtilit.set('projects', JSON.stringify(data));
      })
    );
  }
}
