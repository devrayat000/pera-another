import { Fragment } from 'react'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import SettingsIcon from '@mui/icons-material/Settings'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

const css = String.raw

const Settings = ({ open, duration }: { open: boolean; duration: number }) => {
  return (
    <Fragment>
      <SwitchTransition>
        <CSSTransition
          in={open}
          key={`${open}`}
          addEndListener={(node, done) =>
            node.addEventListener('transitionend', done, false)
          }
          timeout={duration}
          classNames='drawer-openner'
        >
          {open ? (
            <SettingsOutlinedIcon htmlColor='#000' fontSize='large' />
          ) : (
            <SettingsIcon htmlColor='#000' fontSize='large' />
          )}
        </CSSTransition>
      </SwitchTransition>
      <style>
        {css`
          .drawer-openner-enter {
            transform: rotate(0deg);
          }
          .drawer-openner-enter-active {
            transform: rotate(${open ? '180deg' : '-180deg'});
            transition: transform ${duration}ms linear;
          }
          .drawer-openner-exit {
            transform: rotate(${open ? '180deg' : '-180deg'});
          }
          .drawer-openner-exit-active {
            transform: rotate(${open ? '360deg' : '-360deg'});
            transition: transform ${duration}ms linear;
          }
        `}
      </style>
    </Fragment>
  )
}

export default Settings
