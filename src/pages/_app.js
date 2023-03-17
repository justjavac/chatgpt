import '../css/main.css'
import 'focus-visible'
import { Fragment, useEffect, useState } from 'react'
import { Header } from '@/components/Header'
import { Description, Title } from '@/components/Meta'
import Router from 'next/router'
import ProgressBar from '@badrap/bar-of-progress'
import { ResizeObserver } from '@juggle/resize-observer'
import 'intersection-observer'

if (typeof window !== 'undefined' && !('ResizeObserver' in window)) {
  window.ResizeObserver = ResizeObserver
}

const progress = new ProgressBar({
  size: 2,
  color: '#38bdf8',
  className: 'bar-of-progress',
  delay: 100,
})

// this fixes safari jumping to the bottom of the page
// when closing the search modal using the `esc` key
if (typeof window !== 'undefined') {
  progress.start()
  progress.finish()
}

Router.events.on('routeChangeStart', () => progress.start())
Router.events.on('routeChangeComplete', () => progress.finish())
Router.events.on('routeChangeError', () => progress.finish())

export default function App({ Component, pageProps, router }) {
  let [navIsOpen, setNavIsOpen] = useState(false)

  useEffect(() => {
    if (!navIsOpen) return
    function handleRouteChange() {
      setNavIsOpen(false)
    }
    Router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [navIsOpen])

  const Layout = Component.layoutProps?.Layout || Fragment
  const layoutProps = Component.layoutProps?.Layout
    ? { layoutProps: Component.layoutProps, navIsOpen, setNavIsOpen }
    : {}
  const meta = Component.layoutProps?.meta || {}
  const description = meta.metaDescription || meta.description

  let section =
    meta.section ||
    Object.entries(Component.layoutProps?.Layout?.nav ?? {}).find(([, items]) =>
      items.find(({ href }) => href === router.pathname)
    )?.[0]

  return (
    <>
      <Title>{meta.metaTitle || meta.title}</Title>
      <Description>{description}</Description>
      <Header
        hasNav={Boolean(Component.layoutProps?.Layout?.nav)}
        navIsOpen={navIsOpen}
        onNavToggle={(isOpen) => setNavIsOpen(isOpen)}
        title={meta.title}
        section={section}
      />
      <Layout {...layoutProps}>
        <Component section={section} {...pageProps} />
      </Layout>
    </>
  )
}
