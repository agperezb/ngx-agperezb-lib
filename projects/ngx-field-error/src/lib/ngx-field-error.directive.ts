import {
  AfterViewChecked,
  ComponentRef,
  Directive, Inject,
  OnInit,
  Renderer2,
  ViewContainerRef
}                                     from '@angular/core';
import {
  DefaultErrorMessages,
  ErrorArguments,
  ErrorMessages, FIELD_ERROR_CONFIG, GlobalFieldErrorConfig
}                                     from './field-error-config';
import { AbstractControl, NgControl } from '@angular/forms';
import { NgxFieldErrorComponent }     from './ngx-field-error.component';

@Directive({
  selector: '[validateFieldError]'
})
export class NgxFieldErrorDirective implements OnInit, AfterViewChecked {

  private readonly errors: ErrorMessages<ErrorArguments>;
  private component: ComponentRef<NgxFieldErrorComponent> | null = null;

  constructor(
    private renderer: Renderer2,
    private control: NgControl,
    private vcr: ViewContainerRef,
    @Inject(FIELD_ERROR_CONFIG) private fieldErrorConfig: GlobalFieldErrorConfig
  ) {
    this.errors = {...DefaultErrorMessages, ...fieldErrorConfig.errorMessages}
  }

  ngOnInit(): void {
    this.listenToFormControlChanges();
  }

  ngAfterViewChecked(): void {
    const formControl = this.getFormControl();
    if (formControl) {
      if (formControl.invalid && this.validateInitialState) {
        this.handleFormControlChange();
      }
    }
  }

  private getFormControl(): AbstractControl | null {
    return this.control.control;
  }

  public listenToFormControlChanges(): void {
    const formControl = this.getFormControl();
    if (formControl) {
      formControl.valueChanges.subscribe(() => {
        this.handleFormControlChange();
      });
    }
  }

  private handleFormControlChange(): void {
    const errorCode = this.getFirstErrorKey();
    const errorMessage = errorCode ? this.getErrorMessage(errorCode) : '';
    this.updateErrorComponent(errorMessage);
  }

  private getFirstErrorKey(): string | undefined {
    return Object.keys(this.control.errors || {})[0];
  }

  private getErrorMessage(errorCode?: string): string {
    if (errorCode) {
      const errorArgs: ErrorArguments = this.control.errors![errorCode];
      return this.errors[errorCode](errorArgs) || '';
    }
    return '';
  }

  private updateErrorComponent(errorMessage: string): void {
    if (!this.component && errorMessage) {
      this.createComponent(errorMessage);
    } else if (this.component && !errorMessage) {
      this.destroyComponent();
    } else if (this.component) {
      this.component.instance.text = errorMessage;
    }
    this.toggleErrorClass(!!errorMessage);
  }

  private createComponent(errorMessage: string): void {
    this.component = this.vcr.createComponent(NgxFieldErrorComponent);
    this.component.instance.text = errorMessage;
  }

  private toggleErrorClass(hasError: boolean): void {
    const element = this.vcr.element.nativeElement;
    if (hasError) {
      this.renderer.addClass(element, 'field-error');
    } else {
      this.renderer.removeClass(element, 'field-error');
    }
  }

  public get validateInitialState(): boolean {
    const formControl = this.getFormControl();
    if (formControl) {
      return formControl.touched || formControl.dirty;
    }
    return false;
  }

  private destroyComponent(): void {
    if (this.component) {
      this.component.destroy()
    }
  }
}
