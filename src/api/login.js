import request from '@/utils/request'

export function login(mobile, password) {
  return request.post('api/login/', {
    mobile,
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
