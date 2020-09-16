import { send } from '../utils/socket'

export const subscribeToFriendStatus = (id, cb) => {
  send(`${id}`)
  cb(true)
}

export const unsubscribeToFriendStatus = (id, cb) => {
  send(`${id}`)
  cb(false)
}
