import request from '@/utils/request'


export function get_permission(id) {
  return request.post('api/configure/get_permission', { id })
}
