import React from 'react'
import { Avatar, Badge } from '@mui/material'
import { styled } from '@mui/material/styles'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'

import { BaseDrawerLink } from '../link/drawer-link'
import FacebookIcon from '../icons/facebook'

export interface AuthorProps {
  open: boolean
  text: string
  image: string
  href: string
}

const Author: React.FC<AuthorProps> = ({ open, text, image, href }) => {
  return (
    <BaseDrawerLink
      open={open}
      text={text}
      href={href}
      title={text}
      target='_blank'
      rel='noopener noreferrer'
      leading={
        <Badge
          sx={{
            mr: open ? 3 : 'auto',
          }}
          overlap='circular'
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={<FacebookIcon fontSize='small' />}
        >
          <Avatar
            sx={{
              minWidth: 0,
              justifyContent: 'center',
              color: 'inherit',
            }}
            src={image}
            alt={text}
          />
        </Badge>
      }
    />
  )
}

export default Author
