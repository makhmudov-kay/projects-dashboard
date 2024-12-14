import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mockData } from './data';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  getProjects(): Observable<Project[]> {
    const data = mockData;
    return of(data);
  }
}
