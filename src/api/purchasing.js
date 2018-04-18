import request from '@/utils/request'

export function camilo_order(list) {
  return request.post('api/purchasing/camilo_order', {
    list
  }
  )
}

export function get_camilo_order() {
  return request.post('api/purchasing/get_camilo_order', {
  }
  )
}

export function get_directy_order() {
  return request.post('api/purchasing/get_directy_order', {
  }
  )
}

export function binding_card(list) {
  return request.post('api/purchasing/binding_card', {
    list
  }
  )
}