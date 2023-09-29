import { InjectionToken } from '@angular/core';

export interface GlobalFieldErrorConfig {
  errorMessages:ErrorMessages<ErrorArguments>;
}

export interface ErrorArguments {
  [key: string]: any;
}

export interface ErrorMessages<T> {
  [key: string]: (args: T) => string;
}

export const DefaultErrorMessages: ErrorMessages<ErrorArguments> = {
  required: () => 'El campo es requerido',
  min: ({ min }): string => `Valor mínimo ${min}`,
  max: ({ max }): string => `Valor máximo ${max}`,
  email: (): string => 'Este correo no es válido',
  minlength: ({ requiredLength, actualLength }): string => `Mínimo <strong>${ requiredLength }</strong> caracteres, actual <strong>${ actualLength }</strong>`,
  maxlength: ({ requiredLength, actualLength }): string => `Máximo <strong>${requiredLength}</strong> caracteres, actual <strong>${actualLength}</strong>`
};

export const FIELD_ERROR_CONFIG = new InjectionToken<GlobalFieldErrorConfig>('FieldErrorConfig');
