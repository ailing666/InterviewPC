import _fetch from '@/util/fetch.js'
export function getUserInfo () {
  return _fetch({
    url: '/info'
  })
}

export function userExit () {
  return _fetch({
    url: '/logout'
  })
}
