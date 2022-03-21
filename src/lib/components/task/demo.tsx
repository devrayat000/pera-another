import { Paper, SxProps, Theme, Typography, Box } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

const boldHeader: SxProps<Theme> = {
  fontWeight: 700,
  color: t => t.palette.text.secondary,
}

interface Base {
  id: number
}

export interface TaskDetailsProps<Item extends Base> {
  title: string
  headers: Partial<keyof Item>[]
  items?: Item[]
}

const TaskDetails = function <Item extends Base>({
  title,
  headers,
  items,
}: TaskDetailsProps<Item>) {
  return (
    <Paper
      elevation={1}
      sx={{
        borderRadius: t => t.spacing(4),
        p: t => t.spacing(3),
        overflow: 'hidden',
      }}
    >
      <Typography variant='h5' textAlign='center' fontWeight={700}>
        {title} List
      </Typography>
      <Box sx={{ height: t => t.spacing(1.5) }} />
      <TableContainer sx={{ maxHeight: 280, width: '100%', overflow: 'auto' }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {headers.map(header => (
                <TableCell key={String(header)} component='th' sx={boldHeader}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {items?.map(item => {
              return (
                <TableCell key={item.id}>
                  {headers.map(header => {
                    return (
                      <TableCell
                        key={`${String(header)}_${item.id}`}
                        component='td'
                      >
                        {header}
                      </TableCell>
                    )
                  })}
                </TableCell>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default TaskDetails

function objectKeyMap<O extends object, Return>(
  obj: O,
  callback: (key: keyof O, value: O[keyof O]) => Return
): Return[] {
  const result: Return[] = []

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const element = callback(key, obj[key])
      result.push(element)
    }
  }

  return result
}
