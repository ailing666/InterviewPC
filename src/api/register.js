import _fecth from '@/util/fetch.js'
export function sendCode (data) {
  return _fecth({
    url: '/sendsms',
    data,
    method: 'post'
  })
}
