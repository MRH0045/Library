import request from '@/utils/request'

export function queryAllBookType() {
  return request({
    url: '/bookType',
    method: 'get'
  })
}

export function updateBookType(params) {
  return request({
    url: '/bookType/updateBookType',
    method: 'put',
    params
  })
}

export function removeBookType(id) {
  return request({
    url: '/bookType' + id,
    method: 'delete'
  })
}

export function addBookType(params) {
  return request({
    url: '/bookType',
    method: 'put',
    params
  })
}
