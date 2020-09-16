export const initState = { count: 0 }

export const init = (initState) => {
  return initState
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'incr':
      return { count: state.count + 1 }
    case 'decr':
      return { count: state.count - 1 }
    case 'reset':
      return init(action.payload)
    default:
      throw new Error('invaild action type')
  }
}
