import request from '@/utils/request'

export function sub_camilo_data(list) {
  return request.post('api/supply/commodity/create', {
    list
  }
  )
}

export function get_camilo_order(list) {
  return request.post('api/supply/commodity/get_camilo_order', {
    list
  }
  )
}
