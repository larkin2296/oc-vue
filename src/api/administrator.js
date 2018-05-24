/* 采购商 */
import request from '@/utils/request'

export function get_pcamilo_order(list) {
  return request.post('api/administrator/purchasing/get_camilo', {
    list
  }
  )
}

export function get_pdirectly_order(list) {
  return request.post('api/administrator/purchasing/get_directly', {
    list
  }
  )
}

export function get_sdirectly_order(list) {
  return request.post('api/administrator/purchasing/get_sdirectly', {
    list
  }
  )
}

export function send_camilo_data(list) {
  return request.post('api/administrator/purchasing/send_camilo', {
    list
  }
  )
}

export function get_purchasing_card(list) {
  return request.post('api/administrator/purchasing/get_purchasing_card', {
    list
  }
  )
}

export function get_user_list(list) {
  return request.post('api/administrator/purchasing/get_purchasing_user', {
    list
  }
  )
}

export function set_user_perrmission(list) {
  return request.post('api/administrator/purchasing/set_user_perrmission', {
    list
  }
  )
}

export function get_directly_upload(list) {
  return request.post('api/administrator/purchasing/charge', {
    list
  }
  )
}

export function get_sdirectly_detail(list) {
  return request.post('api/administrator/purchasing/get_sdirectly_detail', {
    list
  }
  )
}
