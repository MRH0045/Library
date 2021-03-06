import request from '@/utils/request'

export function addBook(data) {
  return request({
    url: '/books',
    method: 'put',
    data
  })
}

export function borrowBook(id) {
  return request({
    url: '/books/borrow/' + id,
    method: 'put'
  })
}

export function returnBook(id) {
  return request({
    url: '/books/return/' + id,
    method: 'put'
  })
}

export function queryAllBooks(params) {
  return request({
    url: '/books/query',
    method: 'get',
    params
  })
}

export function removeBook(id) {
  return request({
    url: '/books/' + id,
    method: 'delete'
  })
}

export function updateBook(data) {
  return request({
    url: '/books/update',
    method: 'put',
    data
  })
}
