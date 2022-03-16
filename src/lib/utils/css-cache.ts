import createEmotionCache from '@emotion/cache'

export function createCache() {
  return createEmotionCache({
    key: 'studbook-css',
    prepend: true,
  })
}
