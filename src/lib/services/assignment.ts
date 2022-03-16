import apiInstance from '$lib/modules/axios'

export interface Assignment {
  id: number
  subject: string
  title: string
  due: string
  created_at: string
}

export function getAssignment() {
  return apiInstance.get<Assignment[]>('/assignment-list').then(r => r.data)
}
