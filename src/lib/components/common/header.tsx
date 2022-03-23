import { Grid, Paper, Theme, useMediaQuery } from '@mui/material'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined'
import { useQuery } from 'react-query'

import { getCounter } from '$lib/services/fetch/count'
import { COUNTER_QUERY } from '$lib/utils/constants'
import Task from '../task/header'
import { green, pink, indigo } from '@mui/material/colors'

const HeaderCard = () => {
  const { data } = useQuery(COUNTER_QUERY, getCounter)
  const media = useMediaQuery<Theme>(t => t.breakpoints.up('sm'))

  return (
    <Paper
      sx={{ borderRadius: t => t.spacing(4), p: t => t.spacing(3) }}
      elevation={1}
    >
      <Grid
        container
        spacing={2}
        paddingX={t => t.spacing(4)}
        alignItems={media ? 'center' : 'start'}
        flexDirection={media ? 'row' : 'column'}
      >
        <Grid item xs={4}>
          <Task
            icon={NoteAltOutlinedIcon}
            title='Class Tests'
            count={data?.total_cts_count!}
            color={pink}
          />
        </Grid>
        <Grid item xs={4}>
          <Task
            icon={AssignmentOutlinedIcon}
            title='Assignments'
            count={data?.total_assignments_count!}
          />
        </Grid>
        <Grid container item xs={4} direction='column' gap={2}>
          <Grid item xs={6}>
            <Task
              small
              icon={NoteAltOutlinedIcon}
              title="This week's Class Tests"
              count={data?.this_weeks_cts_count!}
              color={green}
            />
          </Grid>
          <Grid item xs={6}>
            <Task
              small
              icon={AssignmentOutlinedIcon}
              title="This week's Assignments"
              count={data?.this_weeks_assignments_count!}
              color={indigo}
            />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default HeaderCard
