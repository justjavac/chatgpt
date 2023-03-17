import clsx from 'clsx'
import NextDocument, { Head, Html, Main, NextScript } from 'next/document'

const FAVICON_VERSION = 3

function v(href) {
  return `${href}?v=${FAVICON_VERSION}`
}

export default class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const initialProps = await NextDocument.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="zh-CN" className="dark [--scroll-mt:9.875rem] lg:[--scroll-mt:6.3125rem]">
        <Head>
          <link rel="icon" type="image/png" sizes="32x32" href={v('/favicons/favicon-32x32.png')} />
          <link rel="icon" type="image/png" sizes="16x16" href={v('/favicons/favicon-16x16.png')} />
          <link rel="shortcut icon" href={v('/favicons/favicon.ico')} />
          <meta name="msapplication-TileColor" content="#38bdf8" />
          <meta name="theme-color" content="#f8fafc" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                try {
                  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark')
                    document.querySelector('meta[name="theme-color"]').setAttribute('content', '#0B1120')
                  } else {
                    document.documentElement.classList.remove('dark')
                  }
                } catch (_) {}
              `,
            }}
          />
        </Head>
        <body
          className={clsx('antialiased text-slate-500 dark:text-slate-400', {
            'bg-white dark:bg-slate-900': !this.props.dangerousAsPath.startsWith('/examples/'),
          })}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
