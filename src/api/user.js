import request from '@/utils/request'

export function getUserInfo() {
  return request({
    url: '/v1/system/getUserInfo',
    method: 'get'
  })
}

export function login(data) {
  return request({
    url: '/v1/system/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'get'
  })
}

export function changePassword(data) {
  return request({
    url: '/v1/system/changePassword',
    method: 'post',
    data
  })
}

export function updateUserInfo(data) {
  return request({
    url: '/v1/system/updateUserInfo',
    method: 'put',
    data
  })
}
