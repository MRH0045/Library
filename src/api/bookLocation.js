import request from '@/utils/request'

export function getAllBookLocation() {
  return request({
    url: '/bookLocation/getAllBookLocation',
    method: 'get'
  })
}

export function updateBookLocation(params) {
  return request({
    url: '/bookLocation',
    method: 'put',
    params
  })
}

export function removeBookLocation(id) {
  return request({
    url: '/bookLocation/' + id,
    method: 'delete'
  })
}

export function addBookLocation(params) {
  return request({
    url: '/bookLocation',
    method: 'post',
    params
  })
}
