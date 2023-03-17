import { importAll } from '@/utils/importAll'

export function createPageList(files) {
  return importAll(files).reduce((acc, cur) => {
    let slug = cur.fileName.substr(2).replace(/\.mdx$/, '')
    return {
      ...acc,
      [slug]: { ...cur.module.default, href: `/${slug}` },
    }
  }, {})
}
