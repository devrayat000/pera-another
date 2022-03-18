import type { GetServerSideProps, NextPage } from 'next'
import { dehydrate } from 'react-query'
import { Avatar, Container, Grid, Paper, Typography } from '@mui/material'
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

const Home: NextPage = () => {
  // const { classTest, assignment, announcement } = useDailyInfo()

  // if (isFetching && !isRefetching) {
  //   return <h2>Loading...</h2>
  // }

  // if (error && error instanceof Error) {
  //   console.log(error)
  //   return <h3>{error.message}</h3>
  // }

  return (
    <div>
      <Container
        maxWidth='md'
        component={Paper}
        sx={{ borderRadius: t => t.spacing(4), p: t => t.spacing(3) }}
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Avatar sx={{ bgcolor: green[100] }}>
              <AttachMoney sx={{ color: green[500] }} />
            </Avatar>
            <Typography>Class Tests</Typography>
          </Grid>
          <Grid item xs={4}>
            <Avatar sx={{ bgcolor: pink[100] }}>
              <AttachMoney sx={{ color: pink[500] }} />
            </Avatar>
            <Typography>Assignments</Typography>
          </Grid>
          <Grid item xs={4}>
            <Avatar sx={{ bgcolor: blue[100] }}>
              <AttachMoney sx={{ color: blue[500] }} />
            </Avatar>
            <Typography>Announcements</Typography>
          </Grid>
        </Grid>
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
