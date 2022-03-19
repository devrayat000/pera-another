import { Container, Typography, Box, Paper } from '@mui/material'
import { NextPage } from 'next'

const HelpPage: NextPage = () => {
  return (
    <Container maxWidth='md'>
      <Typography variant='h4' fontWeight={600}>
        Get your Question answered!
      </Typography>
      <Box height={t => t.spacing(2.5)} />
      <Paper
        sx={{ p: t => t.spacing(2), borderRadius: t => t.spacing(4) }}
      ></Paper>
    </Container>
  )
}

export default HelpPage
