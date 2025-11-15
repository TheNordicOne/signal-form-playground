// Wrapper function to make the usage look as proposed
import { WritableSignal } from '@angular/core';
import {
  applyWhenValue as ngApplyWhenValue,
  FieldPath,
  FieldTree,
  form as ngForm,
  PathKind,
} from '@angular/forms/signals';
import { FieldPathForKey, FormKey } from '../../types/wrapper';

export function form<TValue>(
  model: WritableSignal<TValue>,
  validators: SignalFormValidators<TValue, PathKind.Root>,
): FieldTree<TValue> {
  console.log(validators);
  return ngForm(model);
}

export function applyWhenValue<TValue>(
  path: FieldPath<TValue, PathKind.Root>,
  predicate: (value: TValue) => boolean,
  validators: SignalFormValidators<TValue, PathKind.Root>,
) {
  console.log(validators);
  return ngApplyWhenValue(path, predicate, () => {});
}

type SignalFormValidators<TValue, TPathKind extends PathKind = PathKind.Root> = {
  [K in FormKey<TValue> | 'root']?: (field: FieldPathForKey<TValue, K, TPathKind>) => void;
};
