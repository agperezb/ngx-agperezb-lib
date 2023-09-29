import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';

@Component({
  selector: 'lib-ngx-field-error',
  template: `<small [class.field-hide]="hidden" class="form-error" [innerHtml]="errorMessage"></small>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxFieldErrorComponent {
  errorMessage?: string;
  hidden: boolean = true;

  @Input()
  set text(value: any) {
    if (value !== this.errorMessage) {
      this.errorMessage = value;
      this.hidden = !value;
      this.cdr.detectChanges();
    }
  }
  constructor(private cdr: ChangeDetectorRef) {
    this.errorMessage = '';
  }
}
