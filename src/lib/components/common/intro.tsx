import { Box, IconButton, Typography } from '@mui/material'
import { useQuery } from 'react-query'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

import { getCounter } from '$lib/services/fetch/count'
import { COUNTER_QUERY } from '$lib/utils/constants'
import { useStore } from '$lib/services/store'

const Intro = () => {
  const { data } = useQuery(COUNTER_QUERY, getCounter)
  const mode = useStore(store => store.theme.state)
  const toggleTheme = useStore(store => store.theme.toggle)

  return (
    <Box display='flex' alignItems='center' gap={3}>
      <Typography variant='h4' fontWeight={600}>
        Bonjour 👋🏼
      </Typography>
      <Box flexGrow={1} />
      <Typography variant='h5' fontWeight={600}>
        Current Week: {data?.current_week_no ?? 0}
      </Typography>
      <IconButton onClick={toggleTheme}>
        {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Box>
  )
}

export default Intro
