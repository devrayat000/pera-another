import { useEffect, useMemo, useState } from 'react'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { QueryClientProvider, DehydratedState, Hydrate } from 'react-query'
import { EmotionCache, CacheProvider } from '@emotion/react'
import {
  Box,
  CssBaseline,
  ThemeProvider,
  Container,
  CircularProgress,
  Backdrop,
  createTheme,
  useMediaQuery,
} from '@mui/material'

// import '@fullcalendar/common/main.css'
// import '@fullcalendar/daygrid/main.css'
// import '@fullcalendar/timegrid/main.css'

import queryClient from '$lib/modules/react-query'
import { createCache } from '$lib/utils/css-cache'
import MiniDrawer from '$lib/components/common/drawer'
import {
  InitialState,
  Provider,
  useCreateStore,
  useStore,
} from '$lib/services/store'
import Head from 'next/head'
import { Router } from 'next/router'
import { getTheme } from '$lib/styles/theme'
import { env } from '$lib/services/env'
import { Dept } from '$lib/services/dept/type'
import Script from 'next/script'

const clientCache = createCache()

const MyApp: NextPage<MyAppProps> = ({
  Component,
  pageProps,
  emotionCache = clientCache,
  router,
}) => {
  const createStore = useCreateStore(pageProps?.initialZustandState)

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <CacheProvider value={emotionCache}>
          <Provider createStore={createStore}>
            <Themed>
              {/* <CssBaseline /> */}
              <Box sx={{ display: 'flex' }}>
                <MiniDrawer />
                <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
                  <Container maxWidth='md'>
                    <Head>
                      <meta
                        name='viewport'
                        content='width=device-width, initial-scale=1.0'
                      />
                    </Head>
                    {env.dept !== Dept.ME && process.env.NEXT_PUBLIC_AD_ID && (
                      <Script
                        id='Adsense-id'
                        data-ad-client={process.env.NEXT_PUBLIC_AD_ID}
                        async
                        strategy='beforeInteractive'
                        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_AD_ID}`}
                        crossOrigin='anonymous'
                        onError={e => {
                          console.log('Ad script failed to load')
                          console.log(e)
                        }}
                      />
                    )}
                    <RouterLoader router={router}>
                      <Component {...(pageProps as any)} />
                    </RouterLoader>
                  </Container>
                </Box>
              </Box>
            </Themed>
          </Provider>
        </CacheProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp

const Themed: React.FC = ({ children }) => {
  const mode = useStore(store => store.theme.state)
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = useMemo(() => createTheme(getTheme(mode)), [mode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

interface RouterLoaderProps {
  router: Router
  children: React.ReactChild
}

const RouterLoader = ({ router, children }: RouterLoaderProps) => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const start = () => {
      console.log('start')
      setLoading(true)
    }
    const end = () => {
      console.log('findished')
      setLoading(false)
    }
    router.events.on('routeChangeStart', start)
    router.events.on('routeChangeComplete', end)
    router.events.on('routeChangeError', end)
    return () => {
      router.events.off('routeChangeStart', start)
      router.events.off('routeChangeComplete', end)
      router.events.off('routeChangeError', end)
    }
  }, [router])

  if (loading) {
    return (
      <Backdrop open={loading}>
        <CircularProgress />
      </Backdrop>
    )
  }

  return <>{children}</>
}

interface MyAppProps extends AppProps {
  pageProps: {
    dehydratedState?: DehydratedState
    initialZustandState?: InitialState
  }
  emotionCache?: EmotionCache
}
