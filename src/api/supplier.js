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

export function get_camilo_upload(list) {
  return request.post('api/attachment/cam/list', {
    list
  }
  )
}

export function get_directly_order(list) {
  return request.post('api/supply/verb/directly', {
    list
  }
  )
}
