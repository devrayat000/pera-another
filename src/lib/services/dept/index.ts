import { DeptInfo } from './type'

export function createDept({
  dept,
  rollRexExp,
  rollPlaceholder,
}: Omit<DeptInfo, 'name'>): DeptInfo {
  return {
    dept,
    name: `${dept.replace(/^(\w+)(?=\s)/, '').trim()} 20`,
    rollRexExp,
    rollPlaceholder,
  }
}
