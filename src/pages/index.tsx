import type { GetServerSideProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { dehydrate } from 'react-query'
import { Box } from '@mui/material'

import { getClassTests } from '$lib/services/fetch/class-test'
import { createQueryClient } from '$lib/modules/react-query'
import { getAssignment } from '$lib/services/fetch/assignment'
import { getAnnouncements } from '$lib/services/fetch/announcement'
import {
  ANNOUNCEMENT_QUERY,
  ASSIGNMENT_QUERY,
  CLASS_TEST_QUERY,
  COUNTER_QUERY,
} from '$lib/utils/constants'
import {
  AnnouncementTable,
  AssignmentTable,
  ClassTestTable,
} from '$lib/components/task/individuals'
import { getCounter } from '$lib/services/fetch/count'
import HeaderCard from '$lib/components/common/header'
import Intro from '$lib/components/common/intro'
import { env } from '$lib/services/env'
import { initializeHomePage } from '$lib/components/functions/home'

const Home: NextPage = () => {
  return (
    <div>
      <NextSeo
        title={`${env.name} | Home`}
        description={`A general purpose web platform for information sharing among ${env.name}, BUET`}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'buet,me,mecha,mechanical,20,xx,mech',
          },
        ]}
        openGraph={{
          url: 'https://me-20.vercel.app/',
          title: `${env.name} | BUET`,
          description: `A general purpose web platform for information sharing among ${env.name}, BUET`,
          images: [
            {
              url: '/seo/home.png',
              width: 536,
              height: 146,
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
      <AnnouncementTable />
      <Box height={t => t.spacing(4)} />
      <ClassTestTable />
      <Box height={t => t.spacing(4)} />
      <AssignmentTable />
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async ctx => {
  const queryClient = await initializeHomePage()

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
