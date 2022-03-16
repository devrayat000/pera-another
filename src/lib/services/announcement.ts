import apiInstance from '$lib/modules/axios'

export interface Announcement {
  id: number
  title: string
  description: string
  created_at: string
}

export function getAnnouncements() {
  return apiInstance.get<Announcement[]>('/announcement-list').then(r => r.data)
}
