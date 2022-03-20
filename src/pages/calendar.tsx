// import FullCalendar from '@fullcalendar/react'
// import interactionPlugin from '@fullcalendar/interaction'
// import timeGridPlugin from '@fullcalendar/timegrid'

// const Home = () => (
//   <FullCalendar
//     plugins={[timeGridPlugin, interactionPlugin]}
//     initialView='timeGridWeek'
//     nowIndicator={true}
//     editable={true}
//     initialEvents={[
//       { title: 'nice event', start: new Date() }
//     ]}
//   />
// )

import { NextSeo } from 'next-seo'

import Soon from '$lib/components/common/under-construction'
import { useInfo } from '$lib/services/context/info'

export default function Calendar() {
  const { name } = useInfo()

  return (
    <>
      <NextSeo
        title={`${name} | Calendar`}
        description={`A general purpose web platform for information sharing among ${name}, BUET`}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'buet,me,mecha,mechanical,20,xx,mech',
          },
        ]}
        openGraph={{
          url: 'https://me-20.vercel.app/calendar',
          title: `${name} | BUET`,
          description: `A general purpose web platform for information sharing among ${name}, BUET`,
          images: [
            {
              url: '/seo/calendar.png',
              width: 1002,
              height: 515,
              alt: 'Calendar Og Image Alt',
              type: 'image/png',
            },
          ],
          site_name: name,
        }}
      />
      <Soon />
    </>
  )
}
