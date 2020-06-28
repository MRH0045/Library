import request from '@/utils/request'

export function getBookLocation(id) {
  return request({
    url: '/bookLocation?id=id',
    method: 'get',
    id
  })
}

export function addBook() {
  return request({
    url: '/books',
    method: 'post'
  })
}

export function borrowBook() {
  return request({
    url: '/books/borrow',
    method: 'post'
  })
}

export function returnBook() {
  return request({
    url: '/books/return',
    method: 'post'
  })
}
