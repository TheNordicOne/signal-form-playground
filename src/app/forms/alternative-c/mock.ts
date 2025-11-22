import { WritableSignal } from '@angular/core';
import { FieldTree, form as ngForm, PathKind } from '@angular/forms/signals';
import { SignalFormValidators } from '../../types/mock';

export function form<TValue>(
  model: WritableSignal<TValue>,
  validators: SignalFormValidators<TValue, PathKind.Root>,
): FieldTree<TValue> {
  return ngForm(model);
}
