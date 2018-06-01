import request from '@/utils/request'

export function send_message(mobile) {
  return request.post('api/messages/registerMessage', {
    mobile
  }
  )
}

export function send_message_again(mobile) {
  return request.post('api/messages/registerMessage', {
    mobile
  }
  )
}

export function register(msg, id) {
  return request.post('api/register/index/' + id, msg
  )
}

export function getUrlKey(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [''])[1].replace(/\+/g, '%20')) || null
}
