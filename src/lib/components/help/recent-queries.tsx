import { getRecentHelpQueries } from '$lib/services/fetch/help'
import { HELP_QUERY } from '$lib/utils/constants'
import { Grid, Typography, Paper, Box, GridProps, darken } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useQuery } from 'react-query'

const MyGrid = styled(Grid)<GridProps>(({ theme }) => ({
  margin: 0,
  width: '100%',
  '&>.MuiGrid-item': {
    padding: theme.spacing(2.5, 3.5),
    borderRadius: theme.spacing(1),
  },
}))

const RecentQuery = () => {
  const { data } = useQuery(HELP_QUERY, getRecentHelpQueries)

  if (!data) {
    return <></>
  }

  return (
    <MyGrid container gap={2.5} spacing={2.5} direction='column'>
      {data.map(query => {
        return (
          <Grid key={query.id} item xs={12} component={Paper}>
            <Typography variant='subtitle1' fontWeight={700}>
              Asked by {query.student_id}
            </Typography>
            <Box height={t => t.spacing(1)} />
            <Typography
              variant='subtitle2'
              sx={{
                bgcolor: t => darken(t.palette.background.paper, 0.3),
                p: t => t.spacing(1),
                borderRadius: t => t.spacing(1),
              }}
            >
              {query.question}
            </Typography>

            {query.asnwer && (
              <>
                <Box height={t => t.spacing(2)} />
                <Typography variant='subtitle1' fontWeight={700}>
                  Answered by {query.answered_by}
                </Typography>
                <Box height={t => t.spacing(1)} />

                <Typography
                  variant='subtitle2'
                  sx={{
                    bgcolor: t => darken(t.palette.background.paper, 0.35),
                    p: t => t.spacing(1),
                    borderRadius: t => t.spacing(1),
                  }}
                >
                  {query.asnwer}
                </Typography>
              </>
            )}
          </Grid>
        )
      })}
    </MyGrid>
  )
}

export default RecentQuery
