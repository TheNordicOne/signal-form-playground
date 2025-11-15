import { WritableSignal } from '@angular/core';
import { FieldTree, form as ngForm, LogicFn, PathKind } from '@angular/forms/signals';
import { BaseValidatorConfig, FormKey } from '../../types/wrapper';

// Wrapper function to make the usage look as proposed
export function form<TValue>(
  model: WritableSignal<TValue>,
  validators: SignalFormValidators<TValue>,
): FieldTree<TValue> {
  console.log(validators);
  return ngForm(model);
}

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

type SignalFormValidators<TValue> = Partial<Record<FormKey<TValue> | 'root', (unknown | TValue)[]>>;
