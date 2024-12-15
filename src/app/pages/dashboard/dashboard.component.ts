import { Component, inject, OnInit } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { MenuComponent } from './components/menu/menu.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { Project } from './models/project.model';
import { LocalStorageUtilit } from '../../shared/utils/local-storage.utilit';
import { ActivatedRoute } from '@angular/router';
import { NgDestroy } from '../../shared/services/ng-destroy.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [
    NzMenuModule,
    NzLayoutModule,
    MenuComponent,
    BreadcrumbComponent,
    ProjectDetailComponent,
  ],
  providers: [NgDestroy],
})
export class DashboardComponent implements OnInit {
  get projects(): Project[] {
    return LocalStorageUtilit.get('projects')
      ? JSON.parse(LocalStorageUtilit.get('projects')!)
      : [];
  }

  project!: Project;

  private route = inject(ActivatedRoute);
  private destroy$ = inject(NgDestroy);

  ngOnInit(): void {
    this.subscribeToQueryParam();
  }

  private subscribeToQueryParam() {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.project = this.projects.find((p) => p.id === +params['id'])!;
      });
  }
}
