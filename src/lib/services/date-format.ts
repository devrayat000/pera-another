import moment from 'moment'

export function formatDate(date: string | Date) {
  return moment(date).format('hh:mm a DD MMM, YYYY')
}
