import { WritableSignal } from '@angular/core';
import {
  FieldTree,
  form as ngForm,
  LogicFn,
  OneOrMany,
  PathKind,
  ValidationError,
} from '@angular/forms/signals';

// Wrapper function to make the usage look as proposed
export function form<TValue>(
  model: WritableSignal<TValue>,
  validators: SignalFormValidators<TValue>,
): FieldTree<TValue> {
  console.log(validators);
  return ngForm(model);
}

// Copied from Angular source code

type BaseValidatorConfig<TValue, TPathKind extends PathKind = PathKind.Root> =
  | {
      /** A user-facing error message to include with the error. */
      message?: string | LogicFn<TValue, string, TPathKind>;
      error?: never;
    }
  | {
      /**
       * Custom validation error(s) to report instead of the default,
       * or a function that receives the `FieldContext` and returns custom validation error(s).
       */
      error?: OneOrMany<ValidationError> | LogicFn<TValue, OneOrMany<ValidationError>, TPathKind>;
      message?: never;
    };

// Types for mimicking proposed syntax

type FormKey<T> = T extends object
  ? {
      [K in keyof T & string]: K | (T[K] extends object ? `${K}.${FormKey<T[K]>}` : K);
    }[keyof T & string]
  : never;

type SignalFormValidators<TValue> = Partial<Record<FormKey<TValue> | 'root', (unknown | TValue)[]>>;

export function required<TValue, TPathKind extends PathKind = PathKind.Root>(
  config?: BaseValidatorConfig<TValue, TPathKind> & {
    when?: NoInfer<LogicFn<TValue, boolean, TPathKind>>;
  },
) {
  // Dummy function for mocking realistic API
  return 'required';
}

export function minLength<TValue, TPathKind extends PathKind = PathKind.Root>(
  length: number,
  config?: BaseValidatorConfig<TValue, TPathKind> & {
    when?: NoInfer<LogicFn<TValue, boolean, TPathKind>>;
  },
) {
  // Dummy function for mocking realistic API
  return 'minLength';
}

export function validateBuildingExists() {
  // Dummy function for mocking realistic API
  return 'validateBuildingExists';
}

export function validateRoomExists() {
  // Dummy function for mocking realistic API
  return 'validateRoomExists';
}

export function applyWhenValue(predicate: (value: any) => boolean, validatorFns: unknown[]) {
  // Dummy function for mocking realistic API
  return 'applyWhenValue';
}
