import { Typography } from '@mui/material'
import Image from 'next/image'

const UnserConstruction = () => {
  return (
    <div>
      <Typography variant='h1' component='h1' fontWeight={700}>
        Under Construction
      </Typography>
      <Typography variant='h4' component='h4'>
        Magic is going to happen 😋...
      </Typography>
      <Image
        src='/images/under_construction.png'
        alt='Under Construction'
        layout='fill'
        objectFit='contain'
        objectPosition='bottom right'
      />
    </div>
  )
}

export default UnserConstruction
