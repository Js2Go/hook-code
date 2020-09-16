import { SOCKET_URL } from '../constants'

const instance = new WebSocket(SOCKET_URL)

instance.onopen = e => {
  console.log(e)
}

instance.onmessage = e => {
  const data = JSON.parse(e.data)
  console.log(data)
  // switch (data.type) {
  //   case 'online':
  //     online(data.id)
  //     break
  //   case 'offline':
  //     offline(data.id)
  //     break
  // }
}

export const send = (data) => {
  instance.send(data)
}
