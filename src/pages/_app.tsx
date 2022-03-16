import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { QueryClientProvider, DehydratedState, Hydrate } from 'react-query'

import '@fullcalendar/common/main.css'
import '@fullcalendar/daygrid/main.css'
import '@fullcalendar/timegrid/main.css'
import '../styles/globals.css'

import queryClient from '$lib/modules/react-query'

const MyApp: NextPage<MyAppProps> = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...(pageProps as any)} />
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp

interface MyAppProps extends AppProps {
  pageProps: {
    dehydratedState: DehydratedState
  }
}
