import request from '@/utils/request'

export function login(mobile, password) {
  return request.post('api/login/', {
    mobile,
    password
  }
  )
}

export function getInfo(token) {
  const headers = { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': `Bearer${token}` }
  return request.post('api/user/info', '', { headers: headers })
  // return request.post('api/getinfo', { token })
}

export function logout() {
  return request({
    url: 'api/logout/',
    method: 'post'
  })
}
