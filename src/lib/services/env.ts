import { createDept } from './dept'
import { Dept, DeptInfo } from './dept/type'

export interface Env extends DeptInfo {
  readonly isProd: boolean
  readonly apiUrl: string
}

export function createEnv(info: DeptInfo): Env {
  const env = Object.assign(info, {
    isProd: process.env.NODE_ENV === 'production',
    apiUrl: process.env.NEXT_PUBLIC_API_URL as string,
  })

  return Object.freeze(env)
}

export function getEnv(dept: Dept) {
  const info = {
    [Dept.ME]: createDept({
      dept,
      rollRexExp: /2010(\d{3})/,
      rollPlaceholder: '2010***',
    }),
    [Dept.CSE]: createDept({
      dept,
      rollRexExp: /2005(\d{3})/,
      rollPlaceholder: '2005***',
    }),
    [Dept.URP]: createDept({
      dept,
      rollRexExp: /2015(\d{3})/,
      rollPlaceholder: '2015***',
    }),
  }

  return createEnv(info[dept])
}

export const env = getEnv(process.env.NEXT_PUBLIC_DEPT as Dept)
