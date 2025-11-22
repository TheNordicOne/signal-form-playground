import { WritableSignal } from '@angular/core';
import { FieldPath, FieldTree, form as ngForm, PathKind } from '@angular/forms/signals';
import { FieldPathForKey } from '../../types/mock';

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

type ConditionKey<TConditions extends Record<string, unknown>> = Extract<keyof TConditions, string>;

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
  (fn as any).__applyWhenValue = {
    predicateOrConditionKey,
    validators,
  };
  return fn as ApplyWhenValueFn<TConditionKey>;
}

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
