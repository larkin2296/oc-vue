/* 采购商 */
import request from '@/utils/request'

export function get_dcamilo_list(list) {
  return request.post('api/system/supply/order/index', list
  )
}

export function get_ddirectly_list(list) {
  return request.post('api/system/supply/order/show', list
  )
}

export function modify_deposit(list) {
  return request.post('api/system/supply/present/update', {
    list
  }
  )
}

export function get_depositshow_list(list) {
  return request.post('api/system/supply/presentShow/index', list
  )
}

export function get_deposit_list(list) {
  return request.get('api/system/supply/present/index', {
    list
  }
  )
}

export function set_deposit(id) {
  return request.post('api/system/supply/presentShow/update', id
  )
}

export function set_account(list) {
  return request.post('api/system/supply/order/set_account', {
    list
  }
  )
}

export function get_audit_data(list) {
  return request.post('api/system/supply/audit/index', list
  )
}

export function check_status(status_examine, id) {
  return request.post('api/system/supply/audit/store', {
    status_examine, id
  }
  )
}

export function get_user_list(list) {
  return request.post('api/admin/getSupplierAll', {
    list
  }
  )
}

export function add_admin(list) {
  return request.post('api/system/admin/create', list
  )
}

export function get_admin_list(list) {
  return request.post('api/system/admin/index', list
  )
}

export function modify_manger(list) {
  return request.post('api/system/admin/setAdmin', list
  )
}

export function del_camilo(list) {
  return request.post('api/system/supply/order/destroy', list
  )
}

export function recover_camilo(list) {
  return request.post('api/system/supply/order/recover', list
  )
}
