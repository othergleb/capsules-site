'use client'

import { useState, useEffect } from 'react'

export default function CountdownTimer({ target }: { target: string }) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 })

  useEffect(() => {
    function tick() {
      const diff = new Date(target).getTime() - Date.now()
      if (diff <= 0) { setT({ d: 0, h: 0, m: 0, s: 0 }); return }
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])

  return (
    <span style={{ fontVariantNumeric: 'tabular-nums' }}>
      {t.d}D {String(t.h).padStart(2,'0')}H {String(t.m).padStart(2,'0')}M {String(t.s).padStart(2,'0')}S
    </span>
  )
}
