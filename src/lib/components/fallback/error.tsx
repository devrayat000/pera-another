import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Refresh } from '@mui/icons-material'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'
import { QueryErrorResetBoundary } from 'react-query'

const ErrorComponent: React.FC = ({ children }) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary, error }) => (
            <div>
              <Typography>{error.message}</Typography>
              <Button
                variant='text'
                startIcon={<Refresh />}
                color='error'
                onClick={() => resetErrorBoundary()}
              >
                Try again
              </Button>
            </div>
          )}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}

export default ErrorComponent
