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

export function resetpassMessage(mobile) {
  return request.post('api/messages/resetpassMessage', {
    mobile
  }
  )
}

export function resetpassMessage_again(mobile) {
  return request.post('api/messages/resetpassMessage', {
    mobile
  }
  )
}

export function again_check(param) {
  return request.post('api/register/again_check', param
  )
}

export function updatePasswd(param) {
  return request.post('api/register/updatePasswd', param
  )
}

export function register(msg, id) {
  return request.post('api/register/index/' + id, msg
  )
}

export function getUrlKey(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [''])[1].replace(/\+/g, '%20')) || null
}
