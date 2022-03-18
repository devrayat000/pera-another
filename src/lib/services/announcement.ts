import apiInstance from '$lib/modules/axios'

export interface Announcement extends AnnouncementInput {
  id: number
  title: string
  description: string
  created_at: string
}

export function getAnnouncements() {
  return apiInstance.get<Announcement[]>('/announcement-list').then(r => r.data)
}

export interface AnnouncementInput {
  title: string
  description: string
}

export function createAnnouncement(input: AnnouncementInput) {
  return apiInstance
    .post<Announcement>('/announcement-create/', input)
    .then(r => r.data)
}

export function updateAnnouncement(
  id: string,
  input: Partial<AnnouncementInput>
) {
  return apiInstance
    .post<Announcement>(`announcement-update/${id}/`, input)
    .then(r => r.data)
}

export function deleteAnnouncement(id: string) {
  return apiInstance
    .delete<Announcement>(`announcement-delete/${id}/`)
    .then(r => r.data)
}
