import { createPageList } from '@/utils/createPageList'

const pages = createPageList(
  require.context(`../pages/?meta=title,shortTitle,published`, false, /\.mdx$/)
)

export const documentationNav = {
  入门: [
    {
      title: '介绍',
      href: '/',
    },
    pages['signup'],
    pages['credit-card'],
  ],
  开发: [
    {
      title: 'TODO',
      href: '/api',
    },
  ],
}
