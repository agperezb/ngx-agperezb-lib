import { ModuleWithProviders, NgModule }              from '@angular/core';
import { NgxFieldErrorComponent }                     from './ngx-field-error.component';
import { NgxFieldErrorDirective }                     from './ngx-field-error.directive';
import { FIELD_ERROR_CONFIG, GlobalFieldErrorConfig } from './field-error-config';


@NgModule({
  declarations: [
    NgxFieldErrorComponent,
    NgxFieldErrorDirective
  ],
  imports: [],
  exports: [
    NgxFieldErrorDirective
  ]
})
export class NgxFieldErrorModule {
  static forRoot(config: {
    fieldErrorConfig: GlobalFieldErrorConfig,
  }): ModuleWithProviders<NgxFieldErrorModule> {
    return {
      ngModule: NgxFieldErrorModule,
      providers: [
        {
          provide: FIELD_ERROR_CONFIG,
          useValue: config.fieldErrorConfig
        },
      ],
    };
  }
}
