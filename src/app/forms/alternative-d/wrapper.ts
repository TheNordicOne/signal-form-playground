// Wrapper function to make the usage look as proposed
import { WritableSignal } from '@angular/core';
import { FieldPath, FieldTree, form as ngForm, LogicFn, PathKind } from '@angular/forms/signals';
import { BaseValidatorConfig, FieldPathForKey } from '../../types/wrapper';

export function form<TValue, TConditions extends Record<string, (value: TValue) => boolean> = {}>(
  model: WritableSignal<TValue>,
  config: FormConfig<TValue, TConditions>,
): FieldTree<TValue> {
  return ngForm(model);
}

type FormConfig<TValue, TConditions extends Record<string, (value: TValue) => boolean> = {}> = {
  validators: SignalFormValidators<TValue, PathKind.Root, keyof TConditions & string>;
  conditions?: TConditions & Record<string, (value: TValue) => boolean>;
};

/**
 * Utility type that extracts string keys from conditions record
 * Used to ensure type safety when referencing conditions by their string identifiers
 */
type ConditionKey<TConditions extends Record<string, unknown>> = Extract<keyof TConditions, string>;

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

export function applyWhenValue<TConditionKey extends string = string>(
  predicateOrConditionKey: ((value: any) => boolean) | TConditionKey,
  validators: any,
): ApplyWhenValueFn<TConditionKey> {
  const fn = (field: FieldPath<any, PathKind.Root>) => {
    console.log(
      'applyWhenValue validator called with:',
      field,
      predicateOrConditionKey,
      validators,
    );
  };
  // Brand the function with type information
  (fn as any).__applyWhenValue = {
    predicateOrConditionKey,
    validators,
  };
  return fn as ApplyWhenValueFn<TConditionKey>;
}

// Branded type to carry condition key information
type ApplyWhenValueFn<TConditionKey extends string> = ((
  field: FieldPath<any, PathKind.Root>,
) => unknown) & {
  __brand: 'ApplyWhenValue';
  __conditionKey: TConditionKey;
};

type SignalFormValidators<
  TValue,
  TPathKind extends PathKind = PathKind.Root,
  TConditionKeys extends string = string,
> = {
  [K in keyof TValue | 'root']?: K extends keyof TValue
    ? TValue[K] extends object
      ?
          | ValidatorOrApplyWhen<TValue, K & string, TPathKind, TConditionKeys>[]
          | SignalFormValidators<TValue[K], TPathKind, TConditionKeys>
      : ValidatorOrApplyWhen<TValue, K & string, TPathKind, TConditionKeys>[]
    : K extends 'root'
      ? ValidatorOrApplyWhen<TValue, 'root', TPathKind, TConditionKeys>[]
      : never;
};

type ValidatorFn<TValue, K extends string, TPathKind extends PathKind> = (
  field: FieldPathForKey<TValue, K, TPathKind>,
) => unknown;

// Union type that accepts either regular validators or applyWhenValue validators
// When using ApplyWhenValueFn, the condition keys must be compatible
type ValidatorOrApplyWhen<
  TValue,
  K extends string,
  TPathKind extends PathKind,
  TConditionKeys extends string,
> = ValidatorFn<TValue, K, TPathKind> | ApplyWhenValueFn<TConditionKeys>;
