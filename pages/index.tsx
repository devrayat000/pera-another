import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'

const Home = () => (
  <FullCalendar
    plugins={[timeGridPlugin, interactionPlugin]}
    initialView='timeGridWeek'
    nowIndicator={true}
    editable={true}
    initialEvents={[
      { title: 'nice event', start: new Date() }
    ]}
  />
)

export default Home