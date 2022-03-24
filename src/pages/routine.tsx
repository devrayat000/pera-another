import { GetStaticProps, NextPage } from 'next'
import { Box } from '@mui/system'
import { useQueries } from 'react-query'

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
import TaskDetails from '$lib/components/task/details'

const RoutinePage: NextPage<RoutineProps> = ({ all }) => {
  const data = useQueries([
    {
      queryFn: getSaturdayRoutine,
      queryKey: Day.SAT,
      initialData: all[0],
    },
    {
      queryFn: getSundayRoutine,
      queryKey: Day.SUN,
      initialData: all[1],
    },
    {
      queryFn: getMondayRoutine,
      queryKey: Day.MON,
      initialData: all[2],
    },
    {
      queryFn: getTuesdayRoutine,
      queryKey: Day.TUE,
      initialData: all[3],
    },
    {
      queryFn: getWednesdayRoutine,
      queryKey: Day.WED,
      initialData: all[4],
    },
    {
      queryFn: getThursdayRoutine,
      queryKey: Day.THUR,
      initialData: all[5],
    },
  ])
  return (
    <div>
      <Typography variant='h4' fontWeight={600} textAlign='center'>
        Routine
      </Typography>

      <Box height={t => t.spacing(4)} />
      <Box display='flex' flexDirection='column' alignItems='stretch' gap={3}>
        {data
          .filter(d => !!d.data && d.data.length !== 0)
          .map(({ data: routine }, i) => {
            return (
              <TaskDetails
                key={routine?.at(0)?.day!}
                title={routine?.at(0)?.day?.toUpperCase()!}
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
    queryClient.fetchQuery(Day.SAT, getSaturdayRoutine),
    queryClient.fetchQuery(Day.SUN, getSundayRoutine),
    queryClient.fetchQuery(Day.MON, getMondayRoutine),
    queryClient.fetchQuery(Day.TUE, getTuesdayRoutine),
    queryClient.fetchQuery(Day.WED, getWednesdayRoutine),
    queryClient.fetchQuery(Day.THUR, getThursdayRoutine),
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
