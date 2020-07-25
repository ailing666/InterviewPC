import _fetch from '@/util/fetch.js'
export function getSubjectList () {
  return _fetch({
    url: '/subject/list'
  })
}
