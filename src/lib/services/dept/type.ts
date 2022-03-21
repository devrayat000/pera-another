export const enum Dept {
  ME = 'ME',
  CSE = 'CSE',
  URP = 'URP',
}

export interface DeptInfo {
  readonly dept: Dept
  readonly name: string
  readonly rollRexExp: RegExp
  readonly rollPlaceholder: string
}
