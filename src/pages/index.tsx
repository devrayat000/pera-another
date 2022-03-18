import type { GetServerSideProps, NextPage } from 'next'
import { dehydrate, useQuery } from 'react-query'

import { getClassTests } from '$lib/services/class-test'
import { createQueryClient } from '$lib/modules/react-query'

const CLASS_TEST_QUERY = 'class_tests'

const Home: NextPage = () => {
  const { data, error, isFetching, isRefetching } = useQuery(
    CLASS_TEST_QUERY,
    getClassTests
  )

  if (isFetching && !isRefetching) {
    return <h2>Loading...</h2>
  }

  if (error && error instanceof Error) {
    console.log(error)
    return <h3>{error.message}</h3>
  }

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async ctx => {
  const queryClient = createQueryClient()
  await queryClient.prefetchQuery(CLASS_TEST_QUERY, getClassTests)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
