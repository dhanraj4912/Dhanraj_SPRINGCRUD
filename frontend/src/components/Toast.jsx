import React, { useEffect } from 'react'

export default function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div className={`toast toast--${type}`}>
      <span>{message}</span>
      <button onClick={onClose} className="toast__close">✕</button>
    </div>
  )
}