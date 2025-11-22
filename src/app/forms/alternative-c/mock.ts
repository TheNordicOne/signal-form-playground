import { WritableSignal } from '@angular/core';
import { FieldTree, form as ngForm, PathKind } from '@angular/forms/signals';
import { FieldPathForKey } from '../../types/mock';

export function form<TValue>(
  model: WritableSignal<TValue>,
  validators: SignalFormValidators<TValue, PathKind.Root>,
): FieldTree<TValue> {
  return ngForm(model);
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
