import Head from 'next/head'

export function Title({ suffix = 'ChatGPT 从入门到精通', children }) {
  let title = children + (suffix ? ` - ${suffix}` : '')

  return (
    <>
      <Head>
        <title key="title">{title}</title>
      </Head>
    </>
  )
}

export function Description({ children }) {
  return (
    <>
      <Head>
        <meta name="description" content={children} />
      </Head>
    </>
  )
}
