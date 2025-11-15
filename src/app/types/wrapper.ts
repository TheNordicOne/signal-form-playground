import { FieldPath, LogicFn, OneOrMany, PathKind, ValidationError } from '@angular/forms/signals';

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

export // Helper type to get the FieldPath type for a given key
type FieldPathForKey<TValue, K extends string, TPathKind extends PathKind> = K extends keyof TValue
  ? FieldPath<TValue[K], TPathKind>
  : K extends `${infer First}.${infer Rest}`
    ? First extends keyof TValue
      ? FieldPathForKey<TValue[First], Rest, TPathKind>
      : never
    : K extends 'root'
      ? FieldPath<TValue, TPathKind>
      : never;
