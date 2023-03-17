import { createPageList } from '@/utils/createPageList'

const pages = createPageList(
  require.context(`../pages/?meta=title,shortTitle,published`, false, /\.mdx$/),
)

export const documentationNav = {
  介绍: [
    {
      title: 'ChatGPT',
      href: '/',
    },
    pages['animation'],
  ],
  Sizing: [
    pages['width'],
    pages['height'],
  ],
}
