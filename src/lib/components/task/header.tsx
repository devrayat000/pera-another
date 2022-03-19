import { Avatar, Box, SvgIcon, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'

export interface TaskProps {
  title: string
  count: number
  icon: typeof SvgIcon
  small?: boolean
  color?: Record<keyof typeof blue, string>
}

const Task: React.FC<TaskProps> = ({
  title,
  count,
  icon: Icon,
  small,
  color,
}) => {
  return (
    <Box display='flex' alignItems='center' gap={2}>
      <Avatar
        sx={{
          bgcolor: (color ?? blue)[50],
          height: small ? 48 : 72,
          width: small ? 48 : 72,
        }}
      >
        <Icon
          sx={{ color: (color ?? blue)[500] }}
          fontSize={small ? 'small' : 'large'}
        />
      </Avatar>
      <Box>
        <Typography
          color='GrayText'
          fontSize={t => `calc(${small ? t.spacing(1.5) : t.spacing(2)} + 1px)`}
          variant='subtitle2'
        >
          {title}
        </Typography>
        <Typography variant={small ? 'h6' : 'h4'}>{count}</Typography>
      </Box>
    </Box>
  )
}

export default Task
