import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import { useState } from 'react'
import Settings from '../icons/settings'
import DrawerLink from '../link/drawer-link'
import {
  HelpCenterOutlined,
  ListAltOutlined,
  ViewInArOutlined,
} from '@mui/icons-material'
import { Collapse, Grow, Typography } from '@mui/material'
import { useStore } from '$lib/services/store'

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

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
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
    icon: ViewInArOutlined,
  },
  {
    href: '/help',
    text: 'Help Zone',
    icon: HelpCenterOutlined,
  },
]

export default function MiniDrawer() {
  // const [open, setOpen] = useState(false)
  const open = useStore(store => store.drawer.state)
  const handleDrawerToggle = useStore(store => store.drawer.toggle)

  // const handleDrawerToggle = () => {
  //   setOpen(prev => !prev)
  // }

  return (
    <Drawer
      variant='permanent'
      transitionDuration={duration * 2}
      open={open}
      PaperProps={{
        sx: {
          borderRadius: t => t.spacing(2),
          p: t => t.spacing(2.5),
          // boxShadow: t => t.shadows[1],
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
        <Collapse in={open} orientation='horizontal' mountOnEnter unmountOnExit>
          <Box display='flex' alignItems='end' gap={t => t.spacing(1)}>
            <Typography variant='h4' fontWeight={600} component='h4'>
              ME 2020
            </Typography>
            <Typography>v.69</Typography>
          </Box>
        </Collapse>
        <IconButton onClick={handleDrawerToggle}>
          <Settings open={open} duration={duration} />
        </IconButton>
      </DrawerHeader>
      <List>
        {links.map(link => (
          <DrawerLink key={link.href} open={open} {...link} />
        ))}
      </List>
    </Drawer>
  )
}
