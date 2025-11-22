import { FieldPath, FieldTree, form as ngForm, PathKind } from '@angular/forms/signals';
import { WritableSignal } from '@angular/core';

export function form<TValue>(
  model: WritableSignal<TValue>,
  validators: MockSchemaFn<TValue, PathKind.Root>,
): FieldTree<TValue> {
  console.log(validators);
  return ngForm(model, () => {});
}

export function validatePath(field: FieldPath<any, PathKind.Root>, ...validatorFns: Function[]) {
  console.log(field);
}

type MockMaybeFieldPath<TValue, TPathKind extends PathKind> =
  | (TValue & undefined)
  | MockFieldPath<Exclude<TValue, undefined>, TPathKind>;

type MockFieldPath<TValue, TPathKind> =
  {
    ɵɵTYPE: [TValue, TPathKind];
  } & TValue extends Array<unknown>
    ? unknown
    : TValue extends Record<string, any>
      ? {
          [K in keyof TValue]: MockMaybeFieldPath<TValue[K], PathKind.Child> & {
            validate: (...fns: Function[]) => void;
          };
        }
      : unknown;

type MockSchemaFn<TValue, TPathKind extends PathKind> = (p: MockField<TValue, TPathKind>) => void;

export type MockField<TValue, TPathKind extends PathKind> = MockFieldPath<TValue, TPathKind> & {
  validate: (...fns: Function[]) => void;
};

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
