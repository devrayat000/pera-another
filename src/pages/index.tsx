import type { GetServerSideProps, NextPage } from 'next'
import { dehydrate } from 'react-query'
import { Box, Container, Typography } from '@mui/material'

import { getClassTests } from '$lib/services/class-test'
import { createQueryClient } from '$lib/modules/react-query'
import { getAssignment } from '$lib/services/assignment'
import { getAnnouncements } from '$lib/services/announcement'
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
import { getCounter } from '$lib/services/count'
import HeaderCard from '$lib/components/common/header'

const Home: NextPage = () => {
  return (
    <Container maxWidth='md'>
      <Typography variant='h4' fontWeight={600}>
        Bonjour 👋🏼
      </Typography>
      <Box height={t => t.spacing(2.5)} />
      <HeaderCard />
      <Box height={t => t.spacing(4)} />
      <AnnouncementTable />
      <Box height={t => t.spacing(4)} />
      <ClassTestTable />
      <Box height={t => t.spacing(4)} />
      <AssignmentTable />
    </Container>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async ctx => {
  const queryClient = createQueryClient()

  await Promise.all([
    queryClient.prefetchQuery(CLASS_TEST_QUERY, getClassTests),
    queryClient.prefetchQuery(ASSIGNMENT_QUERY, getAssignment),
    queryClient.prefetchQuery(ANNOUNCEMENT_QUERY, getAnnouncements),
    queryClient.prefetchQuery(COUNTER_QUERY, getCounter),
  ])

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
