import { FieldPath, PathKind } from '@angular/forms/signals';
import { SignalFormValidators } from '../../types/mock';

export function buildingExists() {
  return (field: FieldPath<string, PathKind.Root>) => {
    console.log('validateBuildingExists validator called with:', field);
  };
}

export function roomExists() {
  return (field: FieldPath<any, PathKind.Root>) => {
    console.log('validateRoomExists validator called with:', field);
  };
}

export function whenValue(predicate: (value: any) => boolean, validators: any) {
  return (field: FieldPath<any, PathKind.Root>) => {
    console.log('applyWhenValue validator called with:', field, predicate, validators);
  };
}

export function validateFields<TValue>(
  field: FieldPath<TValue, PathKind.Root>,
  validators: SignalFormValidators<TValue, PathKind.Root>,
) {}

export function validateForm(field: FieldPath<any, PathKind.Root>, ...validatorFns: Function[]) {}
