import { Button, InputBase, InputLabel, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

import { askForHelp, IHelpQuery } from '$lib/services/help'
import { HELP_MUTATION, HELP_QUERY } from '$lib/utils/constants'
import { env } from '$lib/services/env'

const HelpQuery = () => {
  const queryClient = useQueryClient()
  const { mutateAsync, isLoading } = useMutation(HELP_MUTATION, askForHelp, {
    // When mutate is called:
    onMutate: async newQuestion => {
      await queryClient.cancelQueries(HELP_QUERY)
      const previousTodos = queryClient.getQueryData(HELP_QUERY)
      queryClient.setQueryData<IHelpQuery[]>(HELP_QUERY, old => [
        { ...newQuestion, id: old![old!.length - 1].id + 1 },
        ...(old ?? []),
      ])
      return { previousTodos }
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, newQuestion, context) => {
      queryClient.setQueryData(HELP_QUERY, (context as any).previousTodos)
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(HELP_QUERY)
    },
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      question: '',
      student_id: '',
    },
  })

  return (
    <Paper
      component='form'
      sx={{
        py: t => t.spacing(3.5),
        px: t => t.spacing(2.5),
        borderRadius: t => t.spacing(4),
      }}
      onSubmit={handleSubmit(async data => {
        await mutateAsync(data)
        reset()
      })}
    >
      <Typography variant='h5'>Ask what you want to know</Typography>
      <Box height={t => t.spacing(1.25)} />
      <InputBase
        multiline
        fullWidth
        placeholder='Your query...'
        sx={{
          bgcolor: t => t.palette.background.default,
          p: t => t.spacing(1.5),
          borderRadius: t => t.spacing(2),
        }}
        minRows={3}
        inputProps={{
          ...register('question', {
            maxLength: {
              value: 500,
              message: 'Question cannot exceed 500 characters!',
            },
            required: {
              value: true,
              message: 'Question is required!',
            },
          }),
        }}
        error={!!errors.question}
      />
      <Box height={t => t.spacing(1.25)} />
      <Box display='flex' sx={{ width: '100%' }}>
        <Box display='flex' flexGrow={1} alignItems='center'>
          <InputLabel>Student ID:</InputLabel>
          <InputBase
            size='small'
            placeholder={env.rollPlaceholder}
            sx={{
              bgcolor: t => t.palette.background.default,
              py: t => t.spacing(0.75),
              px: t => t.spacing(2.5),
              ml: t => t.spacing(1),
              borderRadius: t => t.spacing(3),
            }}
            inputProps={{
              ...register('student_id', {
                pattern: {
                  value: env.rollRexExp,
                  message: 'Invalid Student ID!',
                },
                required: {
                  value: true,
                  message: 'Student ID is required!',
                },
              }),
            }}
            error={!!errors.student_id}
          />
        </Box>
        <Button
          variant='contained'
          color='info'
          type='submit'
          disabled={isLoading}
        >
          Submit
        </Button>
      </Box>
    </Paper>
  )
}

export default HelpQuery
