import { getCounter } from '$lib/services/count'
import { COUNTER_QUERY } from '$lib/utils/constants'
import { Box, Typography } from '@mui/material'
import { useQuery } from 'react-query'

const Intro = () => {
  const { data } = useQuery(COUNTER_QUERY, getCounter)
  return (
    <Box display='flex' justifyContent='space-between' alignItems='center'>
      <Typography variant='h4' fontWeight={600}>
        Bonjour 👋🏼
      </Typography>
      <Typography variant='h5' fontWeight={600}>
        Current Week: {data?.current_week_no ?? 0}
      </Typography>
    </Box>
  )
}

export default Intro
