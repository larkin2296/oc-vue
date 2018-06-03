import request from '@/utils/request'
import store from '@/store'

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

export function get_config_detail() {
  return request.post('api/configure/get_config_detail', {
  }
  )
}

export function upload_file(param) {
  const headers = { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer${store.getters.token}` }
  return request.post('common/attach/upload', param, { headers: headers })
}

export function get_oil_card(list) {
  return request.post('api/configure/get_oil_card', {
    list
  }
  )
}

export function get_config_goodset(list) {
  return request.post('api/configure/get_config_set', {
    list
  }
  )
}

export function save_config(list) {
  return request.post('api/configure/save_config', {
    list
  }
  )
}

export function get_permission_data(data) {
  return request.post('api/admin/checkUserOauth', {
    data
  }
  )
}

export function save_platform_discount(data) {
  return request.post('api/configure/save_platform_discount', data
  )
}
