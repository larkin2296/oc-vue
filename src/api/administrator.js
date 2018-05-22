/* 采购商 */
import request from '@/utils/request'

export function get_pcamilo_order(list) {
  return request.post('api/administrator/purchasing/get_camilo', {
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
