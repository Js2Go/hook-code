import React, { useState, useEffect } from 'react'

const HookIntroduce = () => {
  const [count, setCount] = useState(0)

  // 相当于 componentDidMount 和 componentDidUpdate
  // 当你调用 useEffect 时，就是在告诉 React 在完成对 DOM 的更改后运行你的“副作用”函数
  // 副作用函数还可以通过返回一个函数来指定如何“清除”副作用

  // 在这个示例中，React 会在组件销毁时取消对 ChatAPI 的订阅，然后在后续渲染时重新执行副作用函数

  // Hook 使用规则
  // - 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用
  // - 只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用
  // - 还有一个地方可以调用 Hook —— 就是自定义的 Hook 中，我们稍后会学习到

  // 提示: 通过跳过 Effect 进行性能优化
  // 如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[]）作为第二个参数
  // React 会等待浏览器完成画面渲染之后才会延迟调用 useEffect
  useEffect(() => {
    document.title = `You clicked ${count} times`

    return () => {
      console.log(`You clicked ${count} times`)
    }
  }, [count]) // 仅在 count 更改时更新

  // 自定义 Hook
  
  // 其他 Hook
  // - useContext
  // - useReducer

  return (
    <div>
      <p>You clicked { count } times</p>
      <button onClick={e => setCount(count + 1)}>Click me</button>
    </div>
  )
}

export default HookIntroduce
