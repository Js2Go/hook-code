import { useState, useEffect } from 'react'
import { subscribeToFriendStatus, unsubscribeToFriendStatus } from '../apis/chat'

const useFriendStatus = friendID => {
  const [isOnline, setIsOnline] = useState(null)

  const handleStatusChange = status => {
    setIsOnline(status)
  }

  useEffect(() => {
    subscribeToFriendStatus(friendID, handleStatusChange)

    return () => {
      unsubscribeToFriendStatus(friendID, handleStatusChange)
    }
  }, [friendID])

  return isOnline
}

export default useFriendStatus
