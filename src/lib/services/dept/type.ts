export const enum Dept {
  ME = 'ME',
  CSE = 'CSE',
  URP = 'URP',
  EEE = 'EEE',
  MSE = 'MSE',
  RUET_CSE = 'RUET CSE',
  RUET_EEE = 'RUET EEE',
}

export interface DeptInfo {
  readonly dept: Dept
  readonly name: string
  readonly rollRexExp?: RegExp
  readonly rollPlaceholder?: string
}
