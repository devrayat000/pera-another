import { forwardRef, useMemo } from 'react'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import ListItemButton, {
  ListItemButtonProps,
  ListItemButtonTypeMap,
} from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { darken, ExtendButtonBase, SvgIcon } from '@mui/material'
import { styled } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

export interface DrawerLinkProps extends LinkProps {
  open?: boolean
  text: string
  icon: typeof SvgIcon
}

// export type BaseDrawerLinkProps<
//   D extends React.ElementType<any> = 'div',
//   P = { component?: D }
// > = MyListItemButton<D, P> & {
//   open?: boolean
//   text: string
//   leading?: JSX.Element
//   trailing?: JSX.Element
// }

export interface BaseDrawerLinkProps extends MyListItemButton {
  open?: boolean
  text: string
  leading?: JSX.Element
  trailing?: JSX.Element
}

// type MyListItemButton<
//   D extends React.ElementType<any> = 'div',
//   P = { component?: D }
// > = ListItemButtonProps<D, P> & {
//   active?: boolean
// }
type A = MyListItemButton['onCopy']
interface MyListItemButton
  extends ListItemButtonProps<'a', { component?: 'a' }> {
  active?: boolean
  component?: 'a'
}

export const MyListItemButton = styled(
  ListItemButton as ExtendButtonBase<ListItemButtonTypeMap<{}, 'a'>>,
  {
    shouldForwardProp: props => props !== 'active',
    name: 'MyListItemButton',
  }
)<MyListItemButton>(({ theme, active }) => ({
  minHeight: 48,
  padding: theme.spacing(1.5, 2),
  color: active ? 'white' : theme.palette.grey[200],
  backgroundColor: active ? theme.palette.primary.main : 'transparent',
  borderRadius: theme.spacing(1.25),
  marginTop: theme.spacing(1.75),
  marginBottom: theme.spacing(1.75),
  ...(active && {
    '&:hover': {
      backgroundColor: darken(theme.palette.primary.main, 0.2),
    },
  }),
}))

export const BaseDrawerLink = forwardRef<
  HTMLAnchorElement,
  BaseDrawerLinkProps
>((props, ref) => {
  const { text, open, active, leading, trailing, ...rest } = props

  return (
    <MyListItemButton
      active={active}
      key={text}
      sx={{
        justifyContent: open ? 'initial' : 'center',
      }}
      {...rest}
      component='a'
      ref={ref}
    >
      {leading}
      <ListItemText
        primary={text}
        sx={{ opacity: open ? 1 : 0, color: 'inherit' }}
      />
      {!active && open && trailing}
    </MyListItemButton>
  )
})

BaseDrawerLink.displayName = 'BaseDrawerLink'

const DrawerLink: React.FC<DrawerLinkProps> = props => {
  const { open, text, icon: Icon, ...rest } = props

  const router = useRouter()

  const isActive = useMemo(
    () => router.pathname === rest.href,
    [router.pathname, rest.href]
  )

  return (
    <Link passHref {...rest}>
      <BaseDrawerLink
        open={open}
        text={text}
        active={isActive}
        leading={
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
        }
        trailing={<ArrowForwardIosIcon sx={{ fontSize: t => t.spacing(2) }} />}
      />
    </Link>
  )
}

export default DrawerLink
