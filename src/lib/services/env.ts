export const enum Dept {
  ME = 'ME',
  CSE = 'CSE',
  URP = 'URP',
}

export const env = {
  get isProd() {
    return process.env.NODE_ENV === 'production'
  },
  get apiUrl() {
    return process.env.NEXT_PUBLIC_API_URL as string
  },
  get dept() {
    return process.env.NEXT_PUBLIC_DEPT as Dept
  },
  get name() {
    return process.env.NEXT_PUBLIC_DEPT_INFO as string
  },
  get rollRexExp() {
    return new RegExp(process.env.NEXT_PUBLIC_ROLL_REGEXP as string)
  },
  get rollPlaceholder() {
    return process.env.NEXT_PUBLIC_ROLL_PLACEHOLDER as string
  },
}
