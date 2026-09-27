import React, { useEffect, useState } from 'react';
import { adminApi } from '../../../../utils/adminApi';

const PagesEleventh = () => {
  const [adminInfo, setAdminInfo] = useState(null);
  const [profileForm, setProfileForm] = useState({ full_name: '', email: '', mobile_number: '' });
  const [passwordForm, setPasswordForm] = useState({ current_password: '', new_password: '', confirm_password: '' });
  const [resetForm, setResetForm] = useState({ email: '', otp: '', new_password: '', confirm_password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');

  const loadSettings = async () => {
    try {
      const response = await adminApi.get('/auth/admin/settings/');
      const data = response.data || {};
      setAdminInfo(data.admin || null);
      setProfileForm({
        full_name: data.admin?.full_name || '',
        email: data.admin?.email || '',
        mobile_number: data.admin?.mobile_number || '',
      });
      setPhotoPreview(data.admin?.profile_photo || '');
    } catch (error) {
      console.error(error);
      setMessage('Unable to load admin settings.');
    }
  };

  useEffect(() => { loadSettings(); }, []);

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetChange = (event) => {
    const { name, value } = event.target;
    setResetForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await adminApi.patch('/auth/admin/profile/', profileForm);
      setAdminInfo(response.data.admin || null);
      setMessage(response.data.message || 'Profile updated.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await adminApi.post('/auth/admin/change-password/', passwordForm);
      setMessage(response.data.message || 'Password changed.');
      setPasswordForm({ current_password: '', new_password: '', confirm_password: '' });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to change password.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await adminApi.post('/auth/admin/forgot-password/', { email: resetForm.email });
      setMessage(response.data.message || 'Reset code sent.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to send reset code.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await adminApi.post('/auth/admin/reset-password/', resetForm);
      setMessage(response.data.message || 'Password reset completed.');
      setResetForm({ email: '', otp: '', new_password: '', confirm_password: '' });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to reset password.');
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append('profile_image', file);
    setLoading(true);
    try {
      const response = await adminApi.post('/auth/admin/profile-photo/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setPhotoPreview(response.data.profile_photo || '');
      setMessage('Profile photo updated.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to upload profile photo.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogoutAllDevices = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await adminApi.post('/auth/admin/logout-all-devices/');
      setMessage(response.data.message || 'Logged out all devices.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to logout all devices.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', boxShadow: '0 10px 28px rgba(0,0,0,0.08)', width: '173vh', maxWidth: '1100px', marginLeft: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div>
            <h2 style={{ margin: 0 }}>Admin Settings</h2>
            <p style={{ margin: '4px 0 0', color: '#64748b' }}>Manage your profile, security, activity, and device access.</p>
          </div>
          <button type="button" onClick={handleLogoutAllDevices} style={{ ...primaryButton, background: '#e11d48' }} disabled={loading}>
            Logout All Devices
          </button>
        </div>

        {message && <div style={{ marginBottom: '16px', padding: '10px 12px', borderRadius: '10px', background: '#ecfeff', color: '#0f766e' }}>{message}</div>}

        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '20px' }}>
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '14px', padding: '18px' }}>
            <h3 style={{ marginTop: 0 }}>Profile Overview</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '72px', height: '72px', borderRadius: '50%', overflow: 'hidden', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#0f172a' }}>
                  {photoPreview ? <img src={photoPreview} alt="Admin" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : 'AD'}
                </div>
                <label style={{ ...secondaryButton, cursor: 'pointer' }}>
                  Upload Photo
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
                </label>
              </div>
              <div style={{ display: 'grid', gap: '10px' }}>
                <div><strong>Admin Name:</strong> {adminInfo?.full_name || '—'}</div>
                <div><strong>Email:</strong> {adminInfo?.email || '—'}</div>
                <div><strong>Mobile Number:</strong> {adminInfo?.mobile_number || '—'}</div>
                <div><strong>Account Status:</strong> <span style={{ color: '#0f766e', fontWeight: 600 }}>{adminInfo?.account_status || 'Active'}</span></div>
                <div><strong>Last Login:</strong> {adminInfo?.last_login ? new Date(adminInfo.last_login).toLocaleString() : '—'}</div>
              </div>
            </div>
          </div>

          <div style={{ border: '1px solid #e2e8f0', borderRadius: '14px', padding: '18px' }}>
            <h3 style={{ marginTop: 0 }}>Update Profile</h3>
            <form onSubmit={handleProfileSubmit} style={{ display: 'grid', gap: '12px' }}>
              <input name="full_name" value={profileForm.full_name} onChange={handleProfileChange} placeholder="Admin Name" style={inputStyle} />
              <input name="email" value={profileForm.email} onChange={handleProfileChange} placeholder="Email" style={inputStyle} />
              <input name="mobile_number" value={profileForm.mobile_number} onChange={handleProfileChange} placeholder="Mobile Number" style={inputStyle} />
              <button type="submit" style={primaryButton} disabled={loading}>{loading ? 'Saving...' : 'Save Profile'}</button>
            </form>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '14px', padding: '18px' }}>
            <h3 style={{ marginTop: 0 }}>Change Password</h3>
            <form onSubmit={handlePasswordSubmit} style={{ display: 'grid', gap: '12px' }}>
              <input type="password" name="current_password" value={passwordForm.current_password} onChange={handlePasswordChange} placeholder="Current Password" style={inputStyle} />
              <input type="password" name="new_password" value={passwordForm.new_password} onChange={handlePasswordChange} placeholder="New Password" style={inputStyle} />
              <input type="password" name="confirm_password" value={passwordForm.confirm_password} onChange={handlePasswordChange} placeholder="Confirm Password" style={inputStyle} />
              <button type="submit" style={primaryButton} disabled={loading}>{loading ? 'Updating...' : 'Change Password'}</button>
            </form>
          </div>

          <div style={{ border: '1px solid #e2e8f0', borderRadius: '14px', padding: '18px' }}>
            <h3 style={{ marginTop: 0 }}>Forgot / Reset Password</h3>
            <form onSubmit={handleForgotPassword} style={{ display: 'grid', gap: '12px', marginBottom: '12px' }}>
              <input name="email" value={resetForm.email} onChange={handleResetChange} placeholder="Admin Email" style={inputStyle} />
              <button type="submit" style={secondaryButton} disabled={loading}>Send Reset Code</button>
            </form>
            <form onSubmit={handleResetSubmit} style={{ display: 'grid', gap: '12px' }}>
              <input name="otp" value={resetForm.otp} onChange={handleResetChange} placeholder="Reset OTP" style={inputStyle} />
              <input type="password" name="new_password" value={resetForm.new_password} onChange={handleResetChange} placeholder="New Password" style={inputStyle} />
              <input type="password" name="confirm_password" value={resetForm.confirm_password} onChange={handleResetChange} placeholder="Confirm Password" style={inputStyle} />
              <button type="submit" style={primaryButton} disabled={loading}>Reset Password</button>
            </form>
          </div>
        </div>

        <div style={{ border: '1px solid #e2e8f0', borderRadius: '14px', padding: '18px', marginTop: '20px' }}>
          <h3 style={{ marginTop: 0 }}>Login Activity</h3>
          <div style={{ display: 'grid', gap: '10px' }}>
            {(adminInfo?.login_activity || []).length > 0 ? adminInfo.login_activity.map((entry, index) => (
              <div key={index} style={{ border: '1px solid #f1f5f9', borderRadius: '10px', padding: '10px 12px', background: '#f8fafc' }}>
                <div style={{ fontWeight: 600 }}>{entry.event}</div>
                <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{new Date(entry.timestamp).toLocaleString()} • {entry.ip}</div>
              </div>
            )) : <div style={{ color: '#64748b' }}>No activity recorded yet.</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

const inputStyle = { width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', boxSizing: 'border-box' };
const primaryButton = { padding: '10px 14px', borderRadius: '10px', border: 'none', background: '#0f766e', color: '#fff', cursor: 'pointer' };
const secondaryButton = { padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', background: '#fff', color: '#0f172a', cursor: 'pointer' };

export default PagesEleventh;
