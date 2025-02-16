import React from 'react'

const useAutoreload = (callback: () => void | Promise<void>, interval: number = 15000) => {
  const callbackRef = React.useRef(callback)
  callbackRef.current = callback

  const timerRef = React.useRef<any>()
  const [lastExec, setLastExec] = React.useState<number>(0)
  const [_interval, _setInterval] = React.useState(interval)

  React.useEffect(() => {
    //console.log('Autoreload:mount')
    const execCallback = async () => {
      //console.log('Autoreload:execCallback', _interval, Date.now() / 1000)
      let p = callbackRef.current()
      if (!(p instanceof Promise)) {
        p = Promise.resolve()
      }
      p
        // .then(() => {
        //   console.log('Autoreload:callback success')
        // })
        .catch((err) => {
          console.error('Autoreload:callback error', err)
        })
        .finally(() => {
          //console.log('Autoreload:callback done')
          if (_interval <= 0) {
            //console.log('Autoreload:skip')
            return
          }
          //console.log('Autoreload:reschedule', _interval)
          timerRef.current = setTimeout(execCallback, _interval)
          setLastExec(Date.now())
        })
    }
    execCallback()

    return () => {
      console.log('Autoreload:unmount')
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [_interval])

  return {
    lastExec: lastExec,
    interval: _interval,
    setInterval: _setInterval,
  }
}

export default useAutoreload
