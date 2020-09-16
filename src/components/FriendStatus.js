import useFriendStatus from '../hooks/useFriendStatus'

const FriendStatus = props => {
  const isOnline = useFriendStatus(props.friend.id)

  if (isOnline === null) {
    return 'Loading...'
  }

  return isOnline ? 'Online' : 'Offline'
}

export default FriendStatus
