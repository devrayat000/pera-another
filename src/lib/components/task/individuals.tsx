import { TableCell, TableRow } from '@mui/material'
import { useQuery } from 'react-query'

import { getAnnouncements } from '$lib/services/fetch/announcement'
import { getAssignment } from '$lib/services/fetch/assignment'
import { getClassTests } from '$lib/services/fetch/class-test'
import {
  ANNOUNCEMENT_QUERY,
  ASSIGNMENT_QUERY,
  CLASS_TEST_QUERY,
} from '$lib/utils/constants'
import TaskDetails from './details'

export const ClassTestTable = () => {
  const { data: cts } = useQuery(CLASS_TEST_QUERY, getClassTests)

  return (
    <TaskDetails
      title='Class Test'
      headers={['subject', 'about', 'type', 'occurring']}
      items={cts}
    >
      {ct => (
        <TableRow
          key={ct.id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component='th' scope='row'>
            {ct.subject}&nbsp;({ct.sec})
          </TableCell>
          <TableCell>{ct.about}</TableCell>
          <TableCell>{ct.type.toUpperCase()}</TableCell>
          <TableCell>{ct.occurring}</TableCell>
        </TableRow>
      )}
    </TaskDetails>
  )
}

export const AssignmentTable = () => {
  const { data: assignments } = useQuery(ASSIGNMENT_QUERY, getAssignment)

  return (
    <TaskDetails
      title='Assignments'
      headers={['subject', 'title', 'due']}
      items={assignments}
    >
      {assignment => (
        <TableRow
          key={assignment.id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component='th' scope='row'>
            {assignment.subject}
          </TableCell>
          <TableCell>{assignment.title}</TableCell>
          <TableCell>{assignment.due}</TableCell>
        </TableRow>
      )}
    </TaskDetails>
  )
}
export const AnnouncementTable = () => {
  const { data: announcements } = useQuery(ANNOUNCEMENT_QUERY, getAnnouncements)

  return (
    <TaskDetails
      title='Announcements'
      headers={['title', 'description']}
      items={announcements}
    >
      {announcement => (
        <TableRow
          key={announcement.id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component='th' scope='row'>
            {announcement.title}
          </TableCell>
          <TableCell
            dangerouslySetInnerHTML={{
              __html: announcement.description.replace(/\n/g, '<br/>'),
            }}
          />
        </TableRow>
      )}
    </TaskDetails>
  )
}
