import { Typography, Box, Paper } from '@mui/material'
import { GetServerSideProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { dehydrate } from 'react-query'

import HelpQuery from '$lib/components/help/query'
import RecentQuery from '$lib/components/help/recent-queries'
import { createQueryClient } from '$lib/modules/react-query'
import { getRecentHelpQueries } from '$lib/services/fetch/help'
import { HELP_QUERY } from '$lib/utils/constants'
import { env } from '$lib/services/env'

const HelpPage: NextPage = () => {
  return (
    <div>
      <NextSeo
        title={`${env.name} | Help`}
        description={`A general purpose web platform for information sharing among ${env.name}, BUET`}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'buet,me,mecha,mechanical,20,xx,mech',
          },
        ]}
        openGraph={{
          url: 'https://www.buetme20.com/help',
          title: `${env.name} | Help`,
          description: `A general purpose web platform for information sharing among ${env.name}, BUET`,
          images: [
            {
              url: '/seo/help.png',
              width: 1280,
              height: 720,
              alt: 'Help Og Image Alt',
              type: 'image/png',
            },
          ],
          site_name: env.name,
        }}
      />
      <Typography variant='h4' fontWeight={600}>
        Get your Question answered!
      </Typography>
      <Box height={t => t.spacing(2.5)} />
      <HelpQuery />
      <Box height={t => t.spacing(5)} />
      <Paper
        sx={{
          py: t => t.spacing(2),
          px: t => t.spacing(2.5),
          borderRadius: t => t.spacing(2),
        }}
      >
        <Typography textAlign='center' variant='h5' fontWeight={700}>
          Recent Queries
        </Typography>
      </Paper>
      <Box height={t => t.spacing(4)} />
      <RecentQuery />
    </div>
  )
}

export default HelpPage

export const getServerSideProps: GetServerSideProps = async ctx => {
  const queryClient = createQueryClient()

  await queryClient.prefetchQuery(HELP_QUERY, getRecentHelpQueries)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
