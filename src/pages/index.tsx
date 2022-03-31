import { ErrorBoundary } from 'react-error-boundary'
import { Suspense } from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { dehydrate } from 'react-query'
import { Box } from '@mui/material'

import {
  AnnouncementTable,
  AssignmentTable,
  ClassTestTable,
} from '$lib/components/task/individuals'
import HeaderCard from '$lib/components/common/header'
import Intro from '$lib/components/common/intro'
import { env } from '$lib/services/env'
import ErrorComponent from '$lib/components/fallback/error'
import Loading from '$lib/components/fallback/loading'

const Home: NextPage = () => {
  return (
    <div>
      <NextSeo
        title={`${env.name} | Home`}
        description={`A general purpose web platform for information sharing among ${env.name}, BUET`}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: `buet,me,mecha,mechanical,20,xx,mech`,
          },
        ]}
        openGraph={{
          url: 'https://www.buetme20.com/',
          title: `${env.name} | Home`,
          description: `A general purpose web platform for information sharing among ${env.name}, BUET`,
          images: [
            {
              url: '/seo/home.png',
              width: 1280,
              height: 720,
              alt: 'Home Og Image Alt',
              type: 'image/png',
            },
          ],
          site_name: env.name,
        }}
      />
      <Intro />
      <Box height={t => t.spacing(2.5)} />
      <HeaderCard />
      <Box height={t => t.spacing(4)} />
      <ErrorComponent>
        <Suspense fallback={<Loading />}>
          <AnnouncementTable />
        </Suspense>
      </ErrorComponent>
      <Box height={t => t.spacing(4)} />
      <ErrorComponent>
        <Suspense fallback={<Loading />}>
          <ClassTestTable />
        </Suspense>
      </ErrorComponent>
      <Box height={t => t.spacing(4)} />
      <ErrorComponent>
        <Suspense fallback={<Loading />}>
          <AssignmentTable />
        </Suspense>
      </ErrorComponent>
    </div>
  )
}

export default Home

// export const getServerSideProps: GetServerSideProps = async ctx => {
//   const queryClient = await initializeHomePage()

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   }
// }
