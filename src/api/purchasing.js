import request from '@/utils/request'

export function camilo_order(list) {
  return request.post('api/purchasing/camilo_order', {
    list
  }
  )
}

export function get_camilo_order(list) {
  return request.post('api/purchasing/get_camilo_order', {
    list
  }
  )
}

export function set_sdirectly_order(list) {
  return request.post('api/purchasing/set_sdirectly_order', {
    list
  }
  )
}
export function get_sdirecty_order(list) {
  return request.post('api/purchasing/get_sdirecty_order', {
    list
  }
  )
}

export function get_ldirecty_order(list) {
  return request.post('api/purchasing/get_ldirecty_order', {
    list
  }
  )
}

export function binding_card(list) {
  return request.post('api/purchasing/binding_card', {
    list
  }
  )
}

export function get_card_list(list) {
  return request.post('api/purchasing/get_card', {
    list
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
  return request.post('api/purchasing/get_camilo_detail', {
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

export function set_camilo_userd(order) {
  return request.post('api/purchasing/set_camilo_userd', {
    order
  }
  )
}

export function send_problem_card(list) {
  return request.post('api/purchasing/send_problem_card', {
    list
  }
  )
}

export function get_initialize_data(list) {
  return request.post('api/purchasing/get_initialize', {
    list
  }
  )
}

export function confirm_status(id) {
  return request.post('api/purchasing/confirm_status', {
    id
  }
  )
}

export function send_initialize(list) {
  return request.post('api/purchasing/send_initialize', {
    list
  }
  )
}

export function get_reconciliation_data(list) {
  return request.post('api/purchasing/get_reconciliation_data', {
    list
  }
  )
}

export function set_reconciliation_data(list) {
  return request.post('api/purchasing/set_reconciliation_data', list
  )
}

export function get_reconciliation_list(list) {
  return request.post('api/purchasing/get_reconciliation_list', {
    list
  }
  )
}

export function get_reconciliation_detail(id) {
  return request.post('api/purchasing/get_reconciliation_detail', {
    id
  }
  )
}

export function get_oilcard_upload(list) {
  return request.post('api/purchasing/get_oilcard_upload', {
    list
  }
  )
}

export function del_short_order(order) {
  return request.post('api/purchasing/del_short_order', { order }
  )
}

export function del_card_data(id) {
  return request.post('api/purchasing/del_card', { id }
  )
}
