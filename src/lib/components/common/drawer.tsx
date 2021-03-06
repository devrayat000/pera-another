import { styled, Theme, CSSObject } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import IconButton from '@mui/material/IconButton'
import {
  HelpCenterOutlined,
  ListAltOutlined,
  CalendarViewMonthOutlined,
} from '@mui/icons-material'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import { Fade, ListItemText, Typography } from '@mui/material'

import { useStore } from '$lib/services/store'
import Settings from '../icons/settings'
import DrawerLink from '../link/drawer-link'
import Author from './author'
import { env } from '$lib/services/env'

import rayat from './developer/rayat.jpg'
import tamim from './developer/tamim.jpg'

const drawerWidth = 320

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(10)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(11)} + 1px)`,
  },
})

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

const duration = 200

const links = [
  {
    href: '/',
    text: 'Overall',
    icon: ListAltOutlined,
  },
  {
    href: '/calendar',
    text: 'Calendar',
    icon: CalendarViewMonthOutlined,
  },
  {
    href: '/help',
    text: 'Help Zone',
    icon: HelpCenterOutlined,
  },
  {
    href: '/routine',
    text: 'Routine',
    icon: AssignmentOutlinedIcon,
  },
]

export default function MiniDrawer() {
  const open = useStore(store => store.drawer.state)
  const handleDrawerToggle = useStore(store => store.drawer.toggle)
  const set = useStore(store => store.drawer.setState)

  console.log(open)

  return (
    <Drawer
      variant='permanent'
      transitionDuration={duration * 2}
      onClose={() => {
        set(false)
      }}
      open={open}
      PaperProps={{
        sx: {
          borderRadius: t => t.spacing(2),
          p: t => t.spacing(2.5),
          border: 0,
          left: t => t.spacing(1.5),
        },
        elevation: 1,
      }}
    >
      <DrawerHeader
        sx={{
          height: t => `calc(${t.spacing(10)} + 1px)`,
          ...(open && {
            justifyContent: 'space-between',
          }),
        }}
        component='header'
        gap={2}
      >
        <Fade in={open} mountOnEnter unmountOnExit>
          <Box display='flex' alignItems='end' gap={t => t.spacing(1)}>
            <Typography variant='h4' fontWeight={600} component='h4'>
              {env.name}
            </Typography>
            <Typography>v.70</Typography>
          </Box>
        </Fade>
        <IconButton onClick={handleDrawerToggle}>
          <Settings open={open} duration={duration} />
        </IconButton>
      </DrawerHeader>
      <List>
        {links.map(link => (
          <DrawerLink key={link.href} open={open} {...link} />
        ))}
      </List>

      <Box display='flex' flexGrow={1} />
      <List>
        <Fade in={open}>
          <ListItemText
            primaryTypographyProps={{
              component: 'h6',
            }}
          >
            Developed By
          </ListItemText>
        </Fade>
        <Author
          open={open}
          text='BooleanWolf'
          href='https://www.facebook.com/mdtamim.sarkar.58/'
          image={tamim.src}
          // image='/images/developer/tamim.jpg'
        />
        <Author
          open={open}
          text='DarkCoder'
          href='https://www.facebook.com/rayat.ass/'
          image={rayat.src}
          // image='/images/developer/rayat.jpg'
        />
      </List>
    </Drawer>
  )
}
