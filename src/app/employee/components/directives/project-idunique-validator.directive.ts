import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from 'src/app/models/project';
import { ProjectsService } from 'src/app/services/projects.service';


@Directive({
  selector: '[appProjectIDUniqueValidator]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: ProjectIDUniqueValidatorDirective, multi: true }]
})
export class ProjectIDUniqueValidatorDirective implements AsyncValidator {

  constructor(private _projectService: ProjectsService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    if (!control.value) {
      return of(null); // Return null if the control value is empty
    }

    return this._projectService.getProjectByProject(control.value).pipe(
      map((projects: Project[]) => {
        if (projects && projects.length > 0) {
          return { uniqueProjectID: { valid: false } };
        } else {
          return null;
        }
      })
    );
  }
}
