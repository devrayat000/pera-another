import axios from 'axios'

import { env } from '$lib/services/env'

const apiInstance = axios.create({
  baseURL: env.apiUrl + '/api/public',
  maxRedirects: 5,
})

export default apiInstance
