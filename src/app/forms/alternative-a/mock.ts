import { WritableSignal } from '@angular/core';
import { FieldTree, form as ngForm } from '@angular/forms/signals';
import { FormKey } from '../../types/mock';

export function form<TValue>(
  model: WritableSignal<TValue>,
  validators: SignalFormValidators<TValue>,
): FieldTree<TValue> {
  console.log(validators);
  return ngForm(model);
}

type SignalFormValidators<TValue> = Partial<Record<FormKey<TValue> | 'root', (unknown | TValue)[]>>;
