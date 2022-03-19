import { Paper, SxProps, Theme, Typography } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { ClassTestType } from '$lib/services/class-test'
import { ClassTest } from '$lib/utils/factory'

const cts = [
  new ClassTest({
    subject: 'Chem-109',
    about: 'CT about Chemical Bonding',
    type: ClassTestType.MCQ,
  }),
  new ClassTest({
    subject: 'Chem-109',
    about: 'CT about Chemical Bonding',
    type: ClassTestType.MCQ,
  }),
  new ClassTest({
    subject: 'Chem-109',
    about: 'CT about Chemical Bonding',
    type: ClassTestType.MCQ,
  }),
  new ClassTest({
    subject: 'Chem-109',
    about: 'CT about Chemical Bonding',
    type: ClassTestType.MCQ,
  }),
  new ClassTest({
    subject: 'Chem-109',
    about: 'CT about Chemical Bonding',
    type: ClassTestType.MCQ,
  }),
]

const boldHeader: SxProps<Theme> = {
  fontWeight: 700,
  color: t => t.palette.text.secondary,
}

const TaskDetails = () => {
  return (
    <Paper
      elevation={1}
      sx={{ borderRadius: t => t.spacing(4), p: t => t.spacing(3) }}
    >
      <Typography variant='h5' textAlign='center' fontWeight={700}>
        Class Test List
      </Typography>
      <TableContainer>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell component='th' sx={boldHeader}>
                Subject
              </TableCell>
              <TableCell component='th' sx={boldHeader} align='right'>
                About
              </TableCell>
              <TableCell component='th' sx={boldHeader} align='right'>
                Type
              </TableCell>
              <TableCell component='th' sx={boldHeader} align='right'>
                Occurring
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cts.map(row => (
              <TableRow
                key={row.subject}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {row.subject}
                </TableCell>
                <TableCell align='right'>{row.about}</TableCell>
                <TableCell align='right'>{row.type.toUpperCase()}</TableCell>
                <TableCell align='right'>{row.occurring}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default TaskDetails
