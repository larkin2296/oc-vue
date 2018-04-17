import request from '@/utils/request'

export function send_message(mobile) {
  return request.post('api/messages/registerMessage', {
    mobile
  }
  )
}

export function send_message_again(mobile) {
  return request.post('api/messages/resetpassMessage', {
    mobile
  }
  )
}

export function register(msg) {
  return request.post('api/register/', {
    msg
  }
  )
}
