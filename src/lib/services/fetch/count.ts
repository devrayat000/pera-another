import apiInstance from '$lib/modules/axios'

export interface Counter {
  current_week_no: number
  this_weeks_assignments_count: number
  this_weeks_cts_count: number
  total_assignments_count: number
  total_cts_count: number
}

export function getCounter() {
  return apiInstance.get<Counter>('/counter/').then(r => r.data)
}
