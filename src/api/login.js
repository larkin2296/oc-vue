import request from '@/utils/request'

export function login(username, password) {
  return request.post('api/login/', {
    username,
    password
  }
  )
}

export function getInfo(token) {
  return request.post('api/getinfo/', { token })
}

export function logout() {
  return request({
    url: 'api/logout/',
    method: 'post'
  })
}

export function register(msg) {
  return request({
    url: 'api/register/',
    method: 'post',
    params: { msg }
  })
}
