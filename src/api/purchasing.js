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

export function set_sdirectly_order(list) {
  return request.post('api/purchasing/set_sdirectly_order', {
    list
  }
  )
}
export function get_sdirecty_order() {
  return request.post('api/purchasing/get_sdirecty_order', {
  }
  )
}

export function get_ldirecty_order() {
  return request.post('api/purchasing/get_ldirecty_order', {
  }
  )
}

export function binding_card(list) {
  return request.post('api/purchasing/binding_card', {
    list
  }
  )
}

export function get_card_list(params) {
  return request.post('api/purchasing/get_card', {
    params
  }
  )
}

export function card_start(card) {
  return request.post('api/purchasing/card_start', {
    card
  }
  )
}

export function set_longtrem(card) {
  return request.post('api/purchasing/set_longtrem', {
    card
  }
  )
}

export function get_short_card(card) {
  return request.post('api/purchasing/get_short_card', {
    card
  }
  )
}
export function directly_order(list) {
  return request.post('api/purchasing/directly_order', {
    list
  }
  )
}

export function get_camilo_detail(order) {
  return request.post('api/purchasing/get_camilo_order', {
    order
  }
  )
}

export function get_ldirectly_detail(card) {
  return request.post('api/purchasing/get_ldirectly_detail', {
    card
  }
  )
}

export function get_sdirectly_detail(order) {
  return request.post('api/purchasing/get_sdirectly_detail', {
    order
  }
  )
}
