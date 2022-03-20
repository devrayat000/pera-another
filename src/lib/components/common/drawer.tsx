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
import { Fade, ListItemText, Typography } from '@mui/material'

import Settings from '../icons/settings'
import DrawerLink from '../link/drawer-link'
import { useStore } from '$lib/services/store'
import { useInfo } from '$lib/services/context/info'
import Author from './author'

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

const DrawerFooter = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'end',
  flexGrow: 1,
  gap: 3.5,
  justifySelf: 'self-end',
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
    href: '/calender',
    text: 'Calender',
    icon: CalendarViewMonthOutlined,
  },
  {
    href: '/help',
    text: 'Help Zone',
    icon: HelpCenterOutlined,
  },
]

export default function MiniDrawer() {
  const open = useStore(store => store.drawer.state)
  const handleDrawerToggle = useStore(store => store.drawer.toggle)

  const { name } = useInfo()

  return (
    <Drawer
      variant='permanent'
      transitionDuration={duration * 2}
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
              {name}
            </Typography>
            <Typography>v.69</Typography>
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
          image='/images/developer/tamim.jpg'
        />
        <Author
          open={open}
          text='DarkCoder'
          href='https://www.facebook.com/rayat.ass/'
          image='/images/developer/rayat.jpg'
        />
      </List>
    </Drawer>
  )
}
