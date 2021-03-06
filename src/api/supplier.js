import request from '@/utils/request'

export function sub_camilo_data(list) {
  return request.post('api/supply/commodity/create', {
    list
  }
  )
}

export function get_camilo_order(list) {
  return request.post('api/supply/verb/index', {
    list
  }
  )
}

export function get_camilo_card(list) {
  return request.post('api/supply/commodity/relationship', {
    list
  }
  )
}

export function send_directly_record(list) {
  return request.post('api/supply/commodity/charge', {
    list
  }
  )
}

export function get_camilo_upload(list) {
  return request.post('api/supply/commodity/lists', {
    list
  }
  )
}

export function get_directly_order(list) {
  return request.post('api/supply/verb/charge', {
    list
  }
  )
}

export function get_directly_upload(list) {
  return request.post('api/supply/commodity/charge', {
    list
  }
  )
}

export function get_directly_pic(id) {
  return request.get('common/attach/show/' + id
  )
}

export function get_deposit_data(list) {
  return request.post('api/supply/forward/index/', {
    list
  }
  )
}

export function send_deposit_data(list) {
  return request.post('api/supply/forward/edit/', {
    list
  }
  )
}

export function deposit(list) {
  return request.post('api/supply/forward/store/', {
    list
  }
  )
}

export function get_deposit_list(list) {
  return request.post('api/supply/forward/show/', {
    list
  }
  )
}
