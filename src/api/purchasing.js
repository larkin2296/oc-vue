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
