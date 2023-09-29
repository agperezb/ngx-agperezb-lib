import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }                                                    from './app.component';
import { NgxFieldErrorModule, FIELD_ERROR_CONFIG, GlobalFieldErrorConfig } from 'ngx-field-error';
import { ReactiveFormsModule }                                             from '@angular/forms';

const globalConfig: GlobalFieldErrorConfig = {
  errorMessages: {
    required: () => 'El campo es requerido'
  }
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgxFieldErrorModule
  ],
  providers: [
    {
      provide: FIELD_ERROR_CONFIG,
      useValue: globalConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
