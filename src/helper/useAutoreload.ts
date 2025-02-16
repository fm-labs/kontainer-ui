import React from 'react'

const useAutoreload = (callback: () => void, interval: number) => {
  const callbackRef = React.useRef(callback)
  callbackRef.current = callback

  const timerRef = React.useRef<any>()
  const lastExec = React.useRef<number>(0)

  const [_interval, _setInterval] = React.useState(interval)

  React.useEffect(() => {
    //console.log('Autoreload:mount')
    const execCallback = () => {
      //console.log('Autoreload:execCallback', _interval)
      callbackRef.current()
      lastExec.current = Date.now()
      if (_interval <= 0) {
        //console.log('Autoreload:skip')
        return
      }
      timerRef.current = setTimeout(execCallback, _interval)
    }
    execCallback()

    return () => {
      //console.log('Autoreload:unmount')
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [_interval])

  return {
    lastExec: lastExec.current,
    interval: _interval,
    setInterval: _setInterval,
  }
}

export default useAutoreload
