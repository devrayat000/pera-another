import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'
import createServerCache from '@emotion/server/create-instance'

import { createCache } from '$lib/utils/css-cache'

class MyDocument extends Document<{ emotionStyleTags: JSX.Element[] }> {
  static async getInitialProps(ctx: DocumentContext) {
    const cache = createCache()
    const { extractCriticalToChunks } = createServerCache(cache)

    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) => props => {
          return <App emotionCache={cache} {...props} />
        },
      })

    const initialProps = await Document.getInitialProps(ctx)

    const emotionStyles = extractCriticalToChunks(initialProps.html)
    const emotionStyleTags = emotionStyles.styles.map(style => (
      <style
        key={style.key}
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ))

    return { ...initialProps, emotionStyleTags }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin=''
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&family=Shizuru&display=swap'
            rel='stylesheet'
          />
          {this.props.emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
