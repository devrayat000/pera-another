import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { QueryClientProvider, DehydratedState, Hydrate } from 'react-query'
import { EmotionCache, CacheProvider } from '@emotion/react'

// import '@fullcalendar/common/main.css'
// import '@fullcalendar/daygrid/main.css'
// import '@fullcalendar/timegrid/main.css'
// import '../styles/globals.css'

import queryClient from '$lib/modules/react-query'
import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from '$lib/styles/theme'
import { createCache } from '$lib/utils/css-cache'
import MiniDrawer from '$lib/components/common/drawer'
import { InitialState, Provider, useCreateStore } from '$lib/services/store'

const clientCache = createCache()

const MyApp: NextPage<MyAppProps> = ({
  Component,
  pageProps,
  emotionCache = clientCache,
}) => {
  const createStore = useCreateStore(pageProps?.initialZustandState)

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Provider createStore={createStore}>
              <Box sx={{ display: 'flex' }}>
                <MiniDrawer />
                <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
                  <Component {...(pageProps as any)} />
                </Box>
              </Box>
            </Provider>
          </ThemeProvider>
        </CacheProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp

interface MyAppProps extends AppProps {
  pageProps: {
    dehydratedState?: DehydratedState
    initialZustandState?: InitialState
  }
  emotionCache?: EmotionCache
}
