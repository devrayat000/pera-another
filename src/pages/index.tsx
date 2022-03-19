import type { GetServerSideProps, NextPage } from 'next'
import { dehydrate } from 'react-query'
import {
  Avatar,
  Box,
  Container,
  Grid,
  ListItem,
  Paper,
  Typography,
} from '@mui/material'
import { green, pink, blue } from '@mui/material/colors'
import { AttachMoney } from '@mui/icons-material'

import { getClassTests } from '$lib/services/class-test'
import { createQueryClient } from '$lib/modules/react-query'
import { getAssignment } from '$lib/services/assignment'
import { getAnnouncements } from '$lib/services/announcement'
import {
  ANNOUNCEMENT_QUERY,
  ASSIGNMENT_QUERY,
  CLASS_TEST_QUERY,
} from '$lib/utils/constants'
import useDailyInfo from '$lib/hooks/useDailyInfo'
import Task from '$lib/components/task/header'
import TaskDetails from '$lib/components/task/details'

const tasks = [
  {
    title: 'Class Tests',
    count: 69,
    icon: AttachMoney,
  },
  {
    title: 'Assignments',
    count: 12,
    icon: AttachMoney,
  },
  {
    title: 'Announcements',
    count: 35,
    icon: AttachMoney,
  },
]

const Home: NextPage = () => {
  return (
    <div>
      <Container maxWidth='md'>
        <Typography variant='h4' fontWeight={600}>
          Bonjour 👋🏼
        </Typography>
        <Box height={t => t.spacing(2.5)} />
        <Paper
          sx={{ borderRadius: t => t.spacing(4), p: t => t.spacing(3) }}
          elevation={1}
        >
          <Grid container spacing={2} paddingX={t => t.spacing(4)}>
            {tasks.map((task, index) => (
              <Grid key={task.title} item xs={4} component={ListItem}>
                <Task {...task} />
              </Grid>
            ))}
          </Grid>
        </Paper>
        <Box height={t => t.spacing(4)} />
        <TaskDetails />
      </Container>
    </div>
  )
}

export default Home

// export const getServerSideProps: GetServerSideProps = async ctx => {
//   const queryClient = createQueryClient()

//   await queryClient.prefetchQuery(CLASS_TEST_QUERY, getClassTests)
//   await queryClient.prefetchQuery(ASSIGNMENT_QUERY, getAssignment)
//   await queryClient.prefetchQuery(ANNOUNCEMENT_QUERY, getAnnouncements)

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   }
// }
