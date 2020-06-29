import request from '@/utils/request'

export function queryBorrowLog(params) {
  return request({
    url: '/borrowLog',
    method: 'get',
    params
  })
}
