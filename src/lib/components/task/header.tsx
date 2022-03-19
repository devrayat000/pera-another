import { Avatar, Box, SvgIcon, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'

export interface TaskProps {
  title: string
  count: number
  icon: typeof SvgIcon
}

const Task: React.FC<TaskProps> = ({ title, count, icon: Icon }) => {
  return (
    <Box display='flex' alignItems='center' gap={2}>
      <Avatar sx={{ bgcolor: blue[50], height: 56, width: 56 }}>
        <Icon sx={{ color: blue[500] }} />
      </Avatar>
      <Box>
        <Typography color='GrayText' variant='subtitle2'>
          {title}
        </Typography>
        <Typography variant='h4'>{count}</Typography>
      </Box>
    </Box>
  )
}

export default Task
