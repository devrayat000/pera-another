import { useMemo } from 'react'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import ListItemButton, {
  ListItemButtonProps,
} from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { SvgIcon } from '@mui/material'
import { styled } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

export interface DrawerLinkProps extends LinkProps {
  open: boolean
  text: string
  icon: typeof SvgIcon
}

interface MyListItemButton extends ListItemButtonProps {
  active: boolean
  component?: React.ElementType
}

const MyListItemButton = styled(ListItemButton, {
  shouldForwardProp: props => props !== 'active',
  name: 'MyListItemButton',
})<MyListItemButton>(({ theme, active }) => ({
  minHeight: 48,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  color: active ? 'white' : theme.palette.grey[200],
  backgroundColor: active ? theme.palette.primary.main : 'transparent',
  borderRadius: theme.spacing(1.25),
  marginTop: theme.spacing(1.75),
  marginBottom: theme.spacing(1.75),
  ...(active && {
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  }),
}))

const DrawerLink: React.FC<DrawerLinkProps> = props => {
  const { open, text, icon: Icon, ...rest } = props

  const router = useRouter()

  const isActive = useMemo(
    () => router.pathname === rest.href,
    [router.pathname, rest.href]
  )

  return (
    <Link passHref {...rest}>
      <MyListItemButton
        active={isActive}
        key={text}
        sx={{
          justifyContent: open ? 'initial' : 'center',
        }}
        component='a'
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
            color: 'inherit',
          }}
        >
          <Icon />
        </ListItemIcon>
        <ListItemText
          primary={text}
          sx={{ opacity: open ? 1 : 0, color: 'inherit' }}
        />
        {!isActive && open && (
          <ArrowForwardIosIcon sx={{ fontSize: t => t.spacing(2) }} />
        )}
      </MyListItemButton>
    </Link>
  )
}

export default DrawerLink
