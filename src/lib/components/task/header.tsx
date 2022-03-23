import {
  Avatar,
  Box,
  SvgIcon,
  Typography,
  styled,
  useMediaQuery,
  Theme,
  lighten,
} from '@mui/material'
import { blue } from '@mui/material/colors'

export interface TaskProps {
  title: string
  count: number
  icon: typeof SvgIcon
  small?: boolean
  color?: Record<keyof typeof blue, string>
}

const MyAvatar = styled(Avatar, {
  shouldForwardProp: props => props !== 'small',
  name: 'MyAvatar',
  label: 'MyAvatar',
})<{ small?: boolean }>(({ theme, small }) => ({
  height: 48,
  width: 48,
  ...(small && {
    height: 24,
    width: 24,
  }),
  [theme.breakpoints.up('sm')]: {
    height: 72,
    width: 72,
    ...(small && {
      height: 48,
      width: 48,
    }),
  },
}))

const Task: React.FC<TaskProps> = ({
  title,
  count,
  icon: Icon,
  small,
  color,
}) => {
  const media = useMediaQuery<Theme>(t => t.breakpoints.up('sm'))

  return (
    <Box
      display='flex'
      alignItems={!media ? 'stretch' : 'center'}
      gap={2}
      flexDirection={'row'}
      flexGrow={1}
    >
      <MyAvatar
        sx={{
          bgcolor: (color ?? blue)[50],
        }}
      >
        <Icon
          sx={{ color: (color ?? blue)[500] }}
          fontSize={small ? 'small' : 'large'}
        />
      </MyAvatar>
      <Box>
        <Typography
          color={t => lighten(t.palette.text.secondary, 0.0)}
          fontSize={t =>
            !media
              ? `calc(${small ? t.spacing(1.25) : t.spacing(1.5)} + 1px)`
              : `calc(${t.spacing(1.5)} + 1px)`
          }
          variant='subtitle2'
        >
          {title}
        </Typography>
        <Typography variant={!media ? 'h6' : small ? 'h6' : 'h4'}>
          {count}
        </Typography>
      </Box>
    </Box>
  )
}

export default Task
