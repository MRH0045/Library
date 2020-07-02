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
    url: 'user',
    method: 'put',
    data
  })
}

export function queryUser(params) {
  return request({
    url: '/user/query',
    method: 'get',
    params
  })
}

export function removeUser(id) {
  return request({
    url: '/user/' + id,
    method: 'delete'
  })
}

export function register(params) {
  return request({
    url: '/v1/system/register',
    method: 'post',
    params
  })
}

export function banUser(id, operation) {
  return request({
    url: '/user/ban',
    params: { id: id, operation: operation },
    method: 'put'
  })
}
