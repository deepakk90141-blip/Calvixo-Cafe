import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../../../utils/adminApi';
import { saveAdminToken } from '../../../utils/adminAuth';

const AdminLogin = () => {
  const [form, setForm] = useState({ username: 'admin', password: 'Admin@1234' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await adminApi.post('/auth/admin/login/', {
        username: form.username,
        password: form.password,
      });
      saveAdminToken(response.data.access);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid admin credentials.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a' }}>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 420, background: 'white', padding: 24, borderRadius: 16, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
        <h2 style={{ marginBottom: 8 }}>Admin Sign In</h2>
        <p style={{ color: '#64748b', marginBottom: 20 }}>Sign in with your administrator account to access the control panel.</p>
        {error && <div style={{ marginBottom: 12, color: 'crimson' }}>{error}</div>}
        <div style={{ marginBottom: 12 }}>
          <label>Username or email</label>
          <input name="username" value={form.username} onChange={handleChange} style={{ width: '100%', padding: 10, marginTop: 6, borderRadius: 8, border: '1px solid #ddd' }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} style={{ width: '100%', padding: 10, marginTop: 6, borderRadius: 8, border: '1px solid #ddd' }} />
        </div>
        <button type="submit" style={{ width: '100%', padding: 12, background: '#0d6efd', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer' }}>Sign In</button>
      </form>
    </div>
  );
};

export default AdminLogin;
