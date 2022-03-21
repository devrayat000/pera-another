import apiInstance from '$lib/modules/axios'

export interface IHelpQuery extends HelpBody {
  id: number
  student_id: string
  question: string
  answered_by?: string
  asnwer?: string
}

export interface HelpBody {
  question: string
  student_id: string
}

export function askForHelp(body: HelpBody) {
  return apiInstance.post<IHelpQuery>('/help-create/', body).then(r => r.data)
}

export function getRecentHelpQueries() {
  return apiInstance
    .get<IHelpQuery[]>('/help-list/')
    .then(r => r.data.reverse())
}
