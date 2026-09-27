import React, { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext()

export const useToast = () => useContext(ToastContext)

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, opts = {}) => {
    const id = Date.now() + Math.random()
    const toast = { id, message, type: opts.type || 'info' }
    setToasts((t) => [...t, toast])
    const timeout = opts.duration || 2500
    setTimeout(() => {
      setToasts((t) => t.filter(x => x.id !== id))
    }, timeout)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div style={{ position: 'fixed', right: 20, bottom: 90, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {toasts.map(t => (
          <div key={t.id} style={{ background: t.type === 'error' ? '#ff4d4f' : '#333', color: '#fff', padding: '10px 14px', borderRadius: 8, boxShadow: '0 6px 18px rgba(0,0,0,0.12)', minWidth: 200 }}>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export default ToastContext
