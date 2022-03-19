import { Paper, SxProps, Theme, Typography, Box } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { ClassTestType } from '$lib/services/class-test'
import { ClassTest } from '$lib/utils/factory'

const boldHeader: SxProps<Theme> = {
  fontWeight: 700,
  color: t => t.palette.text.secondary,
}

export interface TaskDetailsProps<Item extends object> {
  title: string
  headers: Partial<keyof Item>[]
  items?: Item[]
  children: (item: Item) => JSX.Element
}

const TaskDetails = function <Item extends object>({
  title,
  headers,
  items,
  children,
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
                <TableCell
                  key={header.toString()}
                  component='th'
                  sx={boldHeader}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{items?.map(children)}</TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default TaskDetails
