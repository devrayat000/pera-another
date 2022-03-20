import Image from 'next/image'
import { Typography, Box } from '@mui/material'

const UnserConstruction = () => {
  return (
    <div>
      <Box height={t => t.spacing(10)} />
      <Typography variant='h1' component='h1' fontWeight={700}>
        Coming Soon
      </Typography>
      <Box height={t => t.spacing(3)} />

      <Typography sx={{ maxWidth: '40ch' }}>
        This view will allow to manage your daily activities on a calender as
        event. Also you will be able to synchronize with your google calender.
        This view will be available on the next update. [Pera v70]
      </Typography>
      <Box height={t => t.spacing(5)} />

      <Typography>
        Warm wishes from,
        <br /> BooleanWolf
        <br /> DarkCoder
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
