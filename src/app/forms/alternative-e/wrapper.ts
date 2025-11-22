import { FieldPath, LogicFn, PathKind } from '@angular/forms/signals';
import { BaseValidatorConfig, FieldPathForKey } from '../../types/wrapper';

export function validatePath(field: FieldPath<any, PathKind.Root>, ...validatorFns: Function[]) {
  console.log(field);
}

// Dummy function for mocking realistic API
export function required<TValue, TPathKind extends PathKind = PathKind.Root>(
  config?: BaseValidatorConfig<TValue, TPathKind> & {
    when?: NoInfer<LogicFn<TValue, boolean, TPathKind>>;
  },
) {
  return (field: FieldPath<TValue, TPathKind>) => {
    console.log('required validator called with:', field, config);
  };
}

export function minLength<TValue, TPathKind extends PathKind = PathKind.Root>(
  length: number,
  config?: BaseValidatorConfig<TValue, TPathKind> & {
    when?: NoInfer<LogicFn<TValue, boolean, TPathKind>>;
  },
) {
  return (field: FieldPath<TValue, TPathKind>) => {
    console.log('minLength validator called with:', field, length, config);
  };
}

export function validateBuildingExists() {
  return (field: FieldPath<string, PathKind.Root>) => {
    console.log('validateBuildingExists validator called with:', field);
  };
}

export function validateRoomExists() {
  return (field: FieldPath<any, PathKind.Root>) => {
    console.log('validateRoomExists validator called with:', field);
  };
}

export function applyWhenValue(predicate: (value: any) => boolean, validators: any) {
  return (field: FieldPath<any, PathKind.Root>) => {
    console.log('applyWhenValue validator called with:', field, predicate, validators);
  };
}

type SignalFormValidators<TValue, TPathKind extends PathKind = PathKind.Root> = {
  [K in keyof TValue | 'root']?: K extends keyof TValue
    ? TValue[K] extends object
      ? ValidatorFn<TValue, K & string, TPathKind>[] | SignalFormValidators<TValue[K], TPathKind>
      : ValidatorFn<TValue, K & string, TPathKind>[]
    : K extends 'root'
      ? ValidatorFn<TValue, 'root', TPathKind>[]
      : never;
};

type ValidatorFn<TValue, K extends string, TPathKind extends PathKind> = (
  field: FieldPathForKey<TValue, K, TPathKind>,
) => unknown;
