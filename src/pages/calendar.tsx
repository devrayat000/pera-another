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
import { env } from '$lib/services/env'

export default function Calendar() {
  return (
    <>
      <NextSeo
        title={`${env.name} | Calendar`}
        description={`A general purpose web platform for information sharing among ${env.name}, BUET`}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'buet,me,mecha,mechanical,20,xx,mech',
          },
        ]}
        openGraph={{
          url: 'https://me-20.vercel.app/calendar',
          title: `${env.name} | BUET`,
          description: `A general purpose web platform for information sharing among ${env.name}, BUET`,
          images: [
            {
              url: '/seo/calendar.png',
              width: 1002,
              height: 515,
              alt: 'Calendar Og Image Alt',
              type: 'image/png',
            },
          ],
          site_name: env.name,
        }}
      />
      <Soon />
    </>
  )
}
