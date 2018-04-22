import request from '@/utils/request'

export function get_message(token) {
  const headers = { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': `Bearer${token}` }
  return request.post('api/user/info', '', { headers: headers })
}

export function c_link(token) {
  const headers = { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': `Bearer${token}` }
  return request.post('api/user/link', '', { headers: headers })
}

export function upload(data) {
  return request.post('api/upload/', {
    data
  }, { headers: {
    'Content-Type': 'multipart/form-data'
  }}
  )
}
