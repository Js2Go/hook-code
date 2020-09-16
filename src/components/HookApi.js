// 基础 Hook
  // - useState
  // - useEffect
  // - useContext

// 额外的 Hook
  // - useReducer
  // - useCallback
  // - useMemo
  // - useRef
  // - useImperativeHandle
  // - useLayoutEffect
  // - useDebugValue

import React, { useState, useEffect, useContext, useReducer, useRef, useImperativeHandle, forwardRef } from 'react'

import { ThemeCtx, themes } from '../config/theme'
import { reducer, initState, init } from '../store/count'

// useState
const Counter = ({ initialCount }) => {
  // 函数式更新
  const [count, setCount] = useState(initialCount)

  // 用函数式的 setState 结合展开运算符来达到合并更新对象的效果
  // const incre = () => {
  //   setState(prev => {
  //     return { ...prev, ...update }
  //   })
  // }


  // 惰性初始 state
  // const [state, setState] = useState(() => {
  //   const init = someExpensiveComputation(props)
  //   return init
  // })


  // 跳过 state 更新
  // 调用 State Hook 的更新函数并传入当前的 state 时，
  // React 将跳过子组件的渲染及 effect 的执行。
  // （React 使用 Object.is 比较算法 来比较 state。）

  // 需要注意的是，React 可能仍需要在跳过渲染前渲染该组件。
  // 不过由于 React 不会对组件树的“深层”节点进行不必要的渲染，所以大可不必担心。
  // 如果你在渲染期间执行了高开销的计算，则可以使用 useMemo 来进行优化

  return (
    <>
      Count: { count }<br />
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount(prev => prev - 1)}>-</button>
      <button onClick={() => setCount(prev => prev + 1)}>+</button>
    </>
  )
}

// useEffect
const Eff = () => {
  // useEffect(() => {
  //   console.log('effect')
  // })


  // 清除 effect
  // 在执行下一个 effect 之前，上一个 effect 就已被清除
  useEffect(() => {
    console.log('effect')

    return () => {
      console.log('clear')
    }
  })

  // effect 的执行时机
  // 与 componentDidMount、componentDidUpdate 不同的是，
  // 在浏览器完成布局与绘制之后，传给 useEffect 的函数会延迟调用

  // 然而，并非所有 effect 都可以被延迟执行。
  // 例如，在浏览器执行下一次绘制前，用户可见的 DOM 变更就必须同步执行，
  // 这样用户才不会感觉到视觉上的不一致

  // React 为此提供了一个额外的 useLayoutEffect Hook 来处理这类 effect。
  // 它和 useEffect 的结构相同，区别只是调用时机不同

  // 虽然 useEffect 会在浏览器绘制后延迟执行，但会保证在任何新的渲染前执行。
  // React 将在组件更新前刷新上一轮渲染的 effect


  // effect 的条件执行
  // useEffect(
  //   () => {
  //     const sub = props.source.subscribe()

  //     return () => {
  //       sub.unsubscribe()
  //     }
  //   },
  //   [props.source]
  // ) 只有当 props.source 改变后才会重新创建订阅

  return <div>effect</div>
}

// useContext
const Ctx = () => {
  // 接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值。
  // 当前的 context 值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定

  // 当组件上层最近的 <MyContext.Provider> 更新时，该 Hook 会触发重渲染，
  // 并使用最新传递给 MyContext provider 的 context value 值。
  // 即使祖先使用 React.memo 或 shouldComponentUpdate，也会在组件本身使用 useContext 时重新渲染

  // 调用了 useContext 的组件总会在 context 值变化时重新渲染。
  // 如果重渲染组件的开销较大，你可以 通过使用 memoization 来优化
  const theme = useContext(ThemeCtx)

  return (
    <div style={{ color: theme.fg, backgroundColor: theme.bg }}>
      I am styled by theme context!
    </div>
  )
}

// useReducer
const Reducer = () => {
  // 指定初始 state


  // 惰性初始化
  // 你可以选择惰性地创建初始 state。
  // 为此，需要将 init 函数作为 useReducer 的第三个参数传入，这样初始 state 将被设置为 init(initialArg)

  const [state, dispatch] = useReducer(reducer, initState, init)

  // 跳过 dispatch
  // 如果 Reducer Hook 的返回值与当前 state 相同，React 将跳过子组件的渲染及副作用的执行。
  // （React 使用 Object.is 比较算法 来比较 state。）

  return (
    <>
      Count: { state.count }<br />
      <button onClick={() => dispatch({type: 'reset', payload: initState})}>Reset</button>
      <button onClick={() => dispatch({type: 'decr'})}>-</button>
      <button onClick={() => dispatch({type: 'incr'})}>+</button>
    </>
  )
}


// useCallback
// 返回一个 memoized 回调函数
// useCallback(fn, deps) 相当于 useMemo(() => fn, deps)

// const memoizedCallback = useCallback(
//   () => {
//     doSomething(a, b);
//   },
//   [a, b],
// )


// useMemo
// 返回一个 memoized 值
// 把“创建”函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。
// 这种优化有助于避免在每次渲染时都进行高开销的计算

// 传入 useMemo 的函数会在渲染期间执行。请不要在这个函数内部执行与渲染无关的操作

// 如果没有提供依赖项数组，useMemo 在每次渲染时都会计算新的值

// 你可以把 useMemo 作为性能优化的手段，但不要把它当成语义上的保证

// const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])


// useRef
// useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。
// 返回的 ref 对象在组件的整个生命周期内保持不变

// 请记住，当 ref 对象内容发生变化时，useRef 并不会通知你。
// 变更 .current 属性不会引发组件重新渲染。
// 如果想要在 React 绑定或解绑 DOM 节点的 ref 时运行某些代码，则需要使用回调 ref 来实现

// function TextInputWithFocusButton() {
//   const inputEl = useRef(null);
//   const onButtonClick = () => {
//     // `current` 指向已挂载到 DOM 上的文本输入元素
//     inputEl.current.focus();
//   }
//   return (
//     <>
//       <input ref={inputEl} type="text" />
//       <button onClick={onButtonClick}>Focus the input</button>
//     </>
//   )
// }


// useImperativeHandle
// useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值。
// 在大多数情况下，应当避免使用 ref 这样的命令式代码。useImperativeHandle 应当与 forwardRef 一起使用
let FancyInput = (props, ref) => {
  const inputRef = useRef()
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus()
    },
    hhh: () => {
      inputRef.current.focus()
    }
  }))
  return <input ref={inputRef} />
}
FancyInput = forwardRef(FancyInput)


// useLayoutEffect
// 其函数签名与 useEffect 相同，但它会在所有的 DOM 变更之后同步调用 effect。
// 可以使用它来读取 DOM 布局并同步触发重渲染。
// 在浏览器执行绘制之前，useLayoutEffect 内部的更新计划将被同步刷新


// useDebugValue
// useDebugValue 可用于在 React 开发者工具中显示自定义 hook 的标签
// useDebugValue(value)

// 延迟格式化 debug 值
// 在某些情况下，格式化值的显示可能是一项开销很大的操作。除非需要检查 Hook，否则没有必要这么做

// useDebugValue 接受一个格式化函数作为可选的第二个参数。该函数只有在 Hook 被检查时才会被调用。
// 它接受 debug 值作为参数，并且会返回一个格式化的显示值

// 一个返回 Date 值的自定义 Hook 可以通过格式化函数来避免不必要的 toDateString 函数调用
// useDebugValue(date, date => date.toDateString())

const HookApi = () => {
  const [theme, setTheme] = useState(themes.dark)

  const r = useRef(null)

  useEffect(() => {
    setTimeout(() => {
      r.current.hhh()
    }, 3000)
  }, [])

  const changeTheme = () => {
    setTheme(theme === themes.light ? themes.dark : themes.light)
  }

  return (
    <>
      <ThemeCtx.Provider value={theme}>
        <Counter initialCount={1} />
        <Eff />
        <button onClick={changeTheme}>changeTheme</button><br />
        <Ctx />
        <Reducer />
        <FancyInput ref={r} />
      </ThemeCtx.Provider>
    </>
  )
}

export default  HookApi
