import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ProfileMenu = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const avatarLabel = (user?.full_name || user?.name || 'User')
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
  const avatarUrl = user?.profile_image || user?.avatar || null

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '10px 14px',
          borderRadius: 999,
          border: '1px solid rgba(148,163,184,0.3)',
          background: '#fff',
          cursor: 'pointer',
          minWidth: 125,
        }}
      >
        <div style={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', background: '#f97316', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 16 }}>
          {avatarUrl ? (
            <img src={avatarUrl} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            avatarLabel
          )}
        </div>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{user?.full_name?.split(' ')[0] || user?.name || 'User'}</div>
          <div style={{ fontSize: 12, color: '#64748b' }}>Profile</div>
        </div>
      </button>

      {open && (
        <div style={{ position: 'absolute', right: 0, top: '110%', minWidth: 200, borderRadius: 18, border: '1px solid #e2e8f0', background: '#fff', boxShadow: '0 18px 36px rgba(15, 23, 42, 0.12)', padding: 10, zIndex: 50 }}>
          <button
            type="button"
            onClick={() => { setOpen(false); navigate('/profile') }}
            style={{ width: '100%', textAlign: 'left', padding: '12px 14px', border: 'none', background: 'transparent', color: '#0f172a', cursor: 'pointer', borderRadius: 14, fontWeight: 600 }}
          >
            Profile view
          </button>
          <button
            type="button"
            onClick={() => { setOpen(false); onLogout() }}
            style={{ width: '100%', textAlign: 'left', padding: '12px 14px', border: 'none', background: 'transparent', color: '#ef4444', cursor: 'pointer', borderRadius: 14, fontWeight: 600 }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default ProfileMenu
