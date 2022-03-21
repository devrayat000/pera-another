import { DeptInfo } from './type'

export function createDept({
  dept,
  rollRexExp,
  rollPlaceholder,
}: Omit<DeptInfo, 'name'>): DeptInfo {
  return {
    dept,
    name: `${dept} 2020`,
    rollRexExp,
    rollPlaceholder,
  }
}
