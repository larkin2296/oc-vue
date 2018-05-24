/* 采购商 */
import request from '@/utils/request'

export function get_dcamilo_list(list) {
  return request.post('api/system/supply/order/index', {
    list
  }
  )
}

export function get_ddirectly_list(list) {
  return request.post('api/system/supply/order/show', {
    list
  }
  )
}

export function get_deposit_list(list) {
  return request.get('api/system/supply/present/index', {
    list
  }
  )
}

export function modify_deposit(list) {
  return request.post('api/system/supply/present/update', {
    list
  }
  )
}
