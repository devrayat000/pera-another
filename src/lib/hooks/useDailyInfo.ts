import { useQuery } from 'react-query'

import { getAnnouncements } from '$lib/services/announcement'
import { getAssignment } from '$lib/services/assignment'
import { getClassTests } from '$lib/services/class-test'
import {
  ANNOUNCEMENT_QUERY,
  ASSIGNMENT_QUERY,
  CLASS_TEST_QUERY,
} from '$lib/utils/constants'

export default function useDailyInfo() {
  const classTestQuery = useQuery(CLASS_TEST_QUERY, getClassTests)
  const assignmentQuery = useQuery(ASSIGNMENT_QUERY, getAssignment)
  const announcementQuery = useQuery(ANNOUNCEMENT_QUERY, getAnnouncements)

  return {
    classTest: classTestQuery,
    assignment: assignmentQuery,
    announcement: announcementQuery,
  }
}
