import React, { useEffect, useState, useCallback } from 'react'
import '../assets/styles/App.css'

import HookIntroduce from '../components/HookIntroduce'
import HookApi from '../components/HookApi'
import FriendListItem from '../components/FriendListItem'
import { list } from '../apis/friend'

function App() {
  const [friends, setFriends] = useState([])

  const getFriends = async () => {
    const friends = await list()
    setFriends(friends)
  }

  const f = useCallback(() => {
    getFriends()
  }, [])

  useEffect(() => {
    f()
  }, [f])

  return (
    <div className="App">
      <ul>
        {
          friends.map(friend => {
            return <FriendListItem key={friend.id} friend={friend} />
          })
        }
      </ul>
      <HookApi />
      <HookIntroduce />
    </div>
  )
}

export default App
