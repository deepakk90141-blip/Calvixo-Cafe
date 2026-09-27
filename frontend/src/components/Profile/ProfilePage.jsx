import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import api from '../../utils/api'
import CalvixoLogo from '../CalvixoLogo'

const formatCurrency = (value) => '₹' + Number(value || 0).toFixed(2)

const ProfilePage = () => {
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)
  const [profile, setProfile] = useState(null)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({})

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    const userId = user.id || user.user_id
    if (!userId) {
      navigate('/login')
      return
    }

    const loadProfile = async () => {
      try {
        const [profileRes, ordersRes] = await Promise.all([
          api.get(`/profile/${userId}/`),
          api.get(`/profile/${userId}/orders/`),
        ])

        setProfile(profileRes.data.data)
        setOrders(ordersRes.data.data || [])
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [user, navigate])

  useEffect(() => {
    if (profile) {
      setForm({
        full_name: profile.full_name || '',
        email: profile.email || '',
        mobile_no: profile.mobile_no || '',
        city: profile.city || '',
        state: profile.state || '',
        dob: profile.dob || '',
        gender: profile.gender || '',
        pincode: profile.pincode || '',
        full_address: profile.full_address || '',
      })
    }
  }, [profile])

  const avatarLabel = profile?.full_name?.split(' ').map((word) => word[0]).join('').slice(0, 2).toUpperCase() || user?.name?.slice(0, 2).toUpperCase() || 'U'
  const avatarUrl = profile?.profile_image || profile?.avatar || user?.profile_image || null

  const todayOrders = useMemo(() => {
    const todayString = new Date().toDateString()
    return orders.filter((order) => new Date(order.created_at).toDateString() === todayString)
  }, [orders])

  const ordersByDate = useMemo(() => {
    return orders.reduce((grouped, order) => {
      const dateKey = new Date(order.created_at).toLocaleDateString()
      if (!grouped[dateKey]) grouped[dateKey] = { count: 0, total: 0 }
      grouped[dateKey].count += 1
      grouped[dateKey].total += Number(order.total_amount || 0)
      return grouped
    }, {})
  }, [orders])

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const [previewImage, setPreviewImage] = useState(null)
  const [uploadingImage, setUploadingImage] = useState(false)

  const handleImageSelect = (file) => {
    if (!file) return
    setForm((prev) => ({ ...prev, profile_image: '' }))
    const reader = new FileReader()
    reader.onload = (e) => setPreviewImage(e.target.result)
    reader.readAsDataURL(file)
    // store the file temporarily on state
    setForm((prev) => ({ ...prev, _imageFile: file }))
  }

  const uploadProfileImage = async () => {
    if (!user) return
    const file = form._imageFile
    if (!file) return alert('Please select an image to upload.')
    setUploadingImage(true)
    try {
      const userId = user.id || user.user_id
      const data = new FormData()
      data.append('image', file)
      const res = await api.post(`/profile/${userId}/upload-image/`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      const updated = res.data.data
      setProfile(updated)
      setForm((prev) => ({ ...prev, profile_image: updated.profile_image || '', _imageFile: null }))
      setPreviewImage(null)
      setEditing(false)
    } catch (err) {
      console.error(err)
      alert('Unable to upload image')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSave = async () => {
    if (!user) return
    setSaving(true)
    try {
      const userId = user.id || user.user_id
      const response = await api.patch(`/profile/${userId}/`, form)
      const updatedProfile = response.data.data
      setProfile(updatedProfile)
      setEditing(false)

      const updatedUser = {
        ...user,
        ...updatedProfile,
      }
      setUser(updatedUser)
      localStorage.setItem('currentUser', JSON.stringify(updatedUser))
      localStorage.setItem('user', JSON.stringify(updatedUser))
    } catch (error) {
      console.error(error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div style={{ padding: 24, maxWidth: 1000, margin: '0 auto' }}>Loading profile...</div>
  }

  if (!profile) {
    return <div style={{ padding: 24, maxWidth: 1000, margin: '0 auto' }}>No profile found.</div>
  }

  return (
    <div style={{ padding: 24, maxWidth: 1120, margin: '0 auto', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ width: 96, height: 96, borderRadius: '50%', background: '#f97316', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 32, fontWeight: 700, overflow: 'hidden' }}>
            {avatarUrl ? <img src={avatarUrl} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : avatarLabel}
          </div>
          <div>
            <div style={{ fontSize: 26, fontWeight: 800, color: '#0f172a' }}>{profile.full_name || user?.name || 'Your Name'}</div>
            <div style={{ color: '#475569', marginTop: 6 }}>{profile.email || 'No email provided'}</div>
            <div style={{ color: '#64748b', marginTop: 4 }}>Member since {new Date(profile.created_at).toLocaleDateString()}</div>
          </div>
        </div>
        <div style={{ display: 'grid', gap: 10, minWidth: 240, background: '#fff', borderRadius: 20, padding: 18, boxShadow: '0 18px 48px rgba(15, 23, 42, 0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ color: '#64748b' }}>Today</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#0f172a' }}>{todayOrders.length}</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ color: '#64748b' }}>Orders today</div>
            <div style={{ fontWeight: 700, color: '#0f172a' }}>{formatCurrency(todayOrders.reduce((sum, order) => sum + Number(order.total_amount || 0), 0))}</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ color: '#64748b' }}>Total orders</div>
            <div style={{ fontWeight: 700, color: '#0f172a' }}>{orders.length}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.9fr', gap: 24 }}>
        <section style={{ background: '#fff', borderRadius: 20, padding: 24, boxShadow: '0 18px 48px rgba(15, 23, 42, 0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a' }}>Professional Profile</div>
              <div style={{ color: '#64748b', marginTop: 4 }}>Your details are linked to the database and can be updated here.</div>
            </div>
            <button
              onClick={() => setEditing((open) => !open)}
              style={{ padding: '10px 16px', borderRadius: 12, border: '1px solid #cbd5e1', background: editing ? '#f8fafc' : '#111827', color: editing ? '#334155' : '#fff', cursor: 'pointer' }}
            >
              {editing ? 'Cancel edit' : 'Edit profile'}
            </button>
          </div>

          <div style={{ display: 'grid', gap: 16 }}>
            {['full_name', 'email', 'mobile_no', 'profile_image', 'city', 'state', 'dob', 'gender', 'pincode', 'full_address'].map((field) => (
              <div key={field} style={{ display: 'grid', gap: 8 }}>
                <label style={{ fontSize: 12, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{field.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</label>
                {editing ? (
                  field === 'gender' ? (
                    <select value={form.gender} onChange={(e) => handleChange('gender', e.target.value)} style={{ width: '100%', minHeight: 48, borderRadius: 14, border: '1px solid #d1d5db', padding: '12px 14px', background: '#fff' }}>
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : field === 'full_address' ? (
                    <textarea value={form.full_address} onChange={(e) => handleChange('full_address', e.target.value)} rows={4} style={{ width: '100%', borderRadius: 14, border: '1px solid #d1d5db', padding: '14px 16px', resize: 'vertical', background: '#fff' }} />
                  ) : field === 'profile_image' ? (
                    <div style={{ display: 'grid', gap: 8 }}>
                      <input type="file" accept="image/*" onChange={(e) => handleImageSelect(e.target.files[0])} />
                      {previewImage ? (
                        <img src={previewImage} alt="preview" style={{ width: 96, height: 96, objectFit: 'cover', borderRadius: 12 }} />
                      ) : form.profile_image ? (
                        <img src={form.profile_image} alt="current" style={{ width: 96, height: 96, objectFit: 'cover', borderRadius: 12 }} />
                      ) : null}
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button type="button" onClick={uploadProfileImage} disabled={uploadingImage} style={{ padding: '10px 12px', borderRadius: 10, background: '#111827', color: '#fff', border: 'none' }}>
                          {uploadingImage ? 'Uploading...' : 'Upload image'}
                        </button>
                        <button type="button" onClick={() => { setPreviewImage(null); setForm((p) => ({ ...p, _imageFile: null })) }} style={{ padding: '10px 12px', borderRadius: 10, background: '#fff', border: '1px solid #e5e7eb' }}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <input
                      type={field === 'email' ? 'email' : field === 'dob' ? 'date' : 'text'}
                      value={form[field] || ''}
                      onChange={(e) => handleChange(field, e.target.value)}
                      style={{ width: '100%', height: 48, borderRadius: 14, border: '1px solid #d1d5db', padding: '0 16px', background: '#fff' }}
                    />
                  )
                ) : (
                  <div style={{ minHeight: 48, padding: '14px 16px', borderRadius: 14, background: '#f8fafc', color: '#0f172a', border: '1px solid #e2e8f0' }}>{profile[field] || '-'}</div>
                )}
              </div>
            ))}
          </div>

          {editing && (
            <div style={{ display: 'flex', gap: 12, marginTop: 18 }}>
              <button onClick={handleSave} disabled={saving} style={{ padding: '12px 18px', borderRadius: 14, border: 'none', background: '#111827', color: '#fff', cursor: 'pointer' }}>
                {saving ? 'Saving...' : 'Save changes'}
              </button>
              <button onClick={() => { setEditing(false); setForm({ ...profile }) }} style={{ padding: '12px 18px', borderRadius: 14, border: '1px solid #cbd5e1', background: '#fff', color: '#334155', cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          )}
        </section>

        <aside style={{ display: 'grid', gap: 20 }}>
          <section style={{ background: '#fff', borderRadius: 20, padding: 22, boxShadow: '0 18px 48px rgba(15, 23, 42, 0.06)' }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 14 }}>Order summary</div>
            <div style={{ display: 'grid', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}><span>Total orders</span><strong>{orders.length}</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}><span>Today</span><strong>{todayOrders.length}</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}><span>Total spent</span><strong>{formatCurrency(orders.reduce((sum, order) => sum + Number(order.total_amount || 0), 0))}</strong></div>
            </div>
          </section>

          <section style={{ background: '#fff', borderRadius: 20, padding: 22, boxShadow: '0 18px 48px rgba(15, 23, 42, 0.06)' }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 14 }}>Orders by date</div>
            <div style={{ display: 'grid', gap: 10 }}>
              {Object.keys(ordersByDate).length ? (
                Object.entries(ordersByDate).map(([date, summary]) => (
                  <div key={date} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 14px', borderRadius: 14, background: '#f8fafc' }}>
                    <span>{date}</span>
                    <span>{summary.count} orders • {formatCurrency(summary.total)}</span>
                  </div>
                ))
              ) : (
                <div style={{ color: '#64748b' }}>No orders to summarize yet.</div>
              )}
            </div>
          </section>
        </aside>
      </div>

      <section style={{ marginTop: 28, background: '#fff', borderRadius: 20, padding: 24, boxShadow: '0 18px 48px rgba(15, 23, 42, 0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a' }}>Recent orders</div>
            <div style={{ color: '#64748b' }}>{orders.length ? 'Review your last orders and status updates.' : 'You have not placed any orders yet.'}</div>
          </div>
        </div>

        {orders.length === 0 ? (
          <div style={{ color: '#64748b' }}>No orders found.</div>
        ) : (
          <div style={{ display: 'grid', gap: 14 }}>
            {orders.map((order) => {
              const items = Array.isArray(order.items) ? order.items : JSON.parse(order.items || '[]')
              return (
                <div key={order.id || order.order_number} style={{ borderRadius: 18, border: '1px solid #e2e8f0', padding: 18, background: '#f8fafc' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ fontWeight: 700, color: '#0f172a' }}>Order #{order.order_number || order.id}</div>
                      <div style={{ color: '#475569', marginTop: 4 }}>{new Date(order.created_at).toLocaleString()}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 700 }}>{order.status || 'Unknown'}</div>
                      <div style={{ color: '#475569', marginTop: 4 }}>{formatCurrency(order.total_amount)}</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 14, display: 'grid', gap: 10 }}>
                    {items.slice(0, 3).map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', color: '#0f172a' }}>
                        <span>{item.product_name || item.name || item.title || 'Item'}</span>
                        <span>{item.quantity || item.qty || 1} × {formatCurrency(item.price || item.amount || 0)}</span>
                      </div>
                    ))}
                    {items.length > 3 && <div style={{ color: '#64748b' }}>+{items.length - 3} more items</div>}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}

export default ProfilePage
