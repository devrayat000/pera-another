import apiInstance from '$lib/modules/axios'

export interface IClassLink {
  id: number
  subject: string
  label: string
  link: string
}

export function getClassLink() {
  return apiInstance.get<IClassLink[]>('/class_link-list/').then(r => r.data)
}
