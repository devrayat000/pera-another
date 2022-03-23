import apiInstance from '$lib/modules/axios'

export const enum Day {
  SAT = 'saturday',
  SUN = 'sunday',
  MON = 'monday',
  TUE = 'tuesday',
  WED = 'wednesday',
  THUR = 'thursday',
  FRI = 'friday',
}

export interface Routine {
  id: number
  day: Day
  course: string
  teacher: string
  time: string
  roomNo: string
  linkToClass: string
}

export function getSaturdayRoutine() {
  return apiInstance.get<Routine[]>('/satTask-list/').then(r => r.data)
}

export function getSundayRoutine() {
  return apiInstance.get<Routine[]>('/sunTask-list/').then(r => r.data)
}

export function getMondayRoutine() {
  return apiInstance.get<Routine[]>('/monTask-list/').then(r => r.data)
}

export function getTuesdayRoutine() {
  return apiInstance.get<Routine[]>('/tueTask-list/').then(r => r.data)
}

export function getWednesdayRoutine() {
  return apiInstance.get<Routine[]>('/wedTask-list/').then(r => r.data)
}

export function getThursdayRoutine() {
  return apiInstance.get<Routine[]>('/thursTask-list/').then(r => r.data)
}
