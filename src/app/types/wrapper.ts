import { LogicFn, OneOrMany, PathKind, ValidationError } from '@angular/forms/signals';

// Copied from Angular source code

export type BaseValidatorConfig<TValue, TPathKind extends PathKind = PathKind.Root> =
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

export type FormKey<T> = T extends object
  ? {
      [K in keyof T & string]: K | (T[K] extends object ? `${K}.${FormKey<T[K]>}` : K);
    }[keyof T & string]
  : never;
