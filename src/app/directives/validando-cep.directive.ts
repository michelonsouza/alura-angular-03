import { Directive } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { Observable, map } from 'rxjs';

import { CunsultaCepService } from '../services/cunsulta-cep.service';

@Directive({
  selector: '[validadorCep]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: ValidandoCepDirective,
      multi: true,
    },
  ],
})
export class ValidandoCepDirective implements AsyncValidator {
  constructor(private service: CunsultaCepService) {}
  validate(
    control: AbstractControl<string, any>,
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const { value: cep } = control;

    return this.service
      .getConsultaCep(cep)
      .pipe(
        map((resultado: any) =>
          resultado?.erro ? { validadorCep: true } : null,
        ),
      );
  }
}
