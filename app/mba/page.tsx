'use client'

import { useEffect } from 'react'

export default function MBAPage() {
  useEffect(() => {
    window.open('http://lp.devclub.com.br/mba', '_blank')
    window.history.back()
  }, [])

  return null
}
