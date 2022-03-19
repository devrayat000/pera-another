import {
  ClassTest as IClassTest,
  ClassTestInput,
  ClassTestType,
} from '$lib/services/class-test'

export class ClassTest implements IClassTest {
  id: number
  subject: string
  about: string
  type: ClassTestType
  occurring: string
  created_at: string

  constructor({ subject, type, about }: Omit<ClassTestInput, 'occurring'>) {
    this.id = Math.random()
    this.subject = subject
    this.about = about
    this.type = type
    this.occurring = new Date().toISOString()
    this.created_at = new Date().toISOString()
  }
}
