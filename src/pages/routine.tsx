import { GetStaticProps, NextPage } from 'next'

import { createQueryClient } from '$lib/modules/react-query'
import {
  Day,
  getMondayRoutine,
  getSaturdayRoutine,
  getSundayRoutine,
  getThursdayRoutine,
  getTuesdayRoutine,
  getWednesdayRoutine,
  Routine,
} from '$lib/services/fetch/routine'
import { Typography, TableRow, TableCell, Link } from '@mui/material'
import { Box } from '@mui/system'
import TaskDetails from '$lib/components/task/details'

const RoutinePage: NextPage<RoutineProps> = ({
  sat,
  sun,
  mon,
  tue,
  wed,
  thurs,
  all,
}) => {
  return (
    <div>
      <Typography variant='h4' fontWeight={600} textAlign='center'>
        Routine
      </Typography>

      <Box height={t => t.spacing(4)} />
      <Box display='flex' flexDirection='column' alignItems='stretch' gap={3}>
        {all.map((routine, i) => {
          return (
            <TaskDetails
              key={routine[0].day}
              title={routine[0].day.toUpperCase()}
              items={routine}
              headers={[
                'course',
                'teacher',
                'time',
                // @ts-ignore
                'room',
              ]}
            >
              {rt => {
                return (
                  <TableRow
                    key={rt.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component='th' scope='row'>
                      {rt.course}
                    </TableCell>
                    <TableCell>{rt.teacher}</TableCell>
                    <TableCell>{rt.time}</TableCell>
                    <TableCell>
                      {rt.linkToClass ? (
                        <Link
                          href={rt.linkToClass}
                          title={rt.roomNo}
                          target='_blank'
                        >
                          {rt.roomNo}
                        </Link>
                      ) : (
                        rt.roomNo
                      )}
                    </TableCell>
                  </TableRow>
                )
              }}
            </TaskDetails>
          )
        })}
      </Box>
    </div>
  )
}

export default RoutinePage

export const getStaticProps: GetStaticProps<RoutineProps> = async ctx => {
  const queryClient = createQueryClient()

  const query = await Promise.all([
    queryClient.fetchQuery('sat', getSaturdayRoutine),
    queryClient.fetchQuery('sun', getSundayRoutine),
    queryClient.fetchQuery('mon', getMondayRoutine),
    queryClient.fetchQuery('tue', getTuesdayRoutine),
    queryClient.fetchQuery('wed', getWednesdayRoutine),
    queryClient.fetchQuery('thurs', getThursdayRoutine),
  ])

  console.log(query)

  return {
    props: {
      sat: query[0],
      sun: query[1],
      mon: query[2],
      tue: query[3],
      wed: query[4],
      thurs: query[5],
      all: query.filter(q => q.length > 0),
    },
    revalidate: 60, // 60 seconds
  }
}

interface RoutineProps {
  sat: Routine[]
  sun: Routine[]
  mon: Routine[]
  tue: Routine[]
  wed: Routine[]
  thurs: Routine[]
  all: Routine[][]
}
