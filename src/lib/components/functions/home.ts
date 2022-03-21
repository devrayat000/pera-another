import { createQueryClient } from '$lib/modules/react-query'
import { Dept } from '$lib/services/dept/type'
import { env } from '$lib/services/env'
import { getAnnouncements } from '$lib/services/fetch/announcement'
import { getAssignment } from '$lib/services/fetch/assignment'
import { getClassTests } from '$lib/services/fetch/class-test'
import { getCounter } from '$lib/services/fetch/count'
import { getClassLink } from '$lib/services/fetch/class-link'
import {
  ANNOUNCEMENT_QUERY,
  ASSIGNMENT_QUERY,
  CLASS_TEST_QUERY,
  COUNTER_QUERY,
  CLASS_LINK_QUERY,
} from '$lib/utils/constants'

export async function initializeHomePage() {
  const queryClient = createQueryClient()

  const prefetches: Promise<void>[] = [
    queryClient.prefetchQuery(CLASS_TEST_QUERY, getClassTests),
    queryClient.prefetchQuery(ASSIGNMENT_QUERY, getAssignment),
    queryClient.prefetchQuery(COUNTER_QUERY, getCounter),
  ]

  switch (env.dept) {
    case Dept.ME:
    case Dept.URP:
      prefetches.push(
        queryClient.prefetchQuery(ANNOUNCEMENT_QUERY, getAnnouncements)
      )
      break
    case Dept.CSE:
      prefetches.push(queryClient.prefetchQuery(CLASS_LINK_QUERY, getClassLink))
      break
    default:
      break
  }

  await Promise.all(prefetches)

  return queryClient
}
