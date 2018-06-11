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

export function get_discount_data(data) {
  return request.post('api/configure/get_discount_data', data
  )
}

export function save_discount_data(data) {
  return request.post('api/configure/save_discount_data', data
  )
}

export function formatDate(time, fmt) {
  var date = new Date(time)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    let str = o[k] + ''
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
