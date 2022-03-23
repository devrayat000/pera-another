import moment from 'moment'

export function formatDate(date: string | Date, time: string) {
  const isToday = moment(date).isSame(moment.now(), 'day')
  const d = isToday ? 'today' : moment(date).format('DD MMM, YYYY')
  const t = moment(time).format('hh:mm a')

  return `at ${t}, ${d}`
}
