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

export function modify_deposit(list) {
  return request.post('api/system/supply/present/update', {
    list
  }
  )
}

export function get_deposit_list(list) {
  return request.get('api/system/supply/presentShow/index', {
    list
  }
  )
}

export function set_account(list) {
  return request.post('api/system/supply/order/set_account', {
    list
  }
  )
}
