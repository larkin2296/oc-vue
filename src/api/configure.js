import request from '@/utils/request'

export function get_platform_list(list) {
  return request.post('api/configure/get_platform_list', {
    list
  }
  )
}

export function get_denomination_list(list) {
  return request.post('api/configure/get_denomination_list', {
    list
  }
  )
}

export function add_platform(list) {
  return request.post('api/configure/add_platform', {
    list
  }
  )
}

export function add_denomination(list) {
  return request.post('api/configure/add_denomination', {
    list
  }
  )
}
