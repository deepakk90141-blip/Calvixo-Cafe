import React, { useEffect, useState } from 'react';
import { adminApi } from '../../../../utils/adminApi';

const PagesTenth = () => {
  const [reports, setReports] = useState([]);
  const [form, setForm] = useState({ title: '', summary: '', metric_value: '', trend: 'Up', status: 'Healthy' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const response = await adminApi.get('/reports/');
        setReports(response.data || []);
      } catch (error) {
        console.error(error);
      }
    };
    load();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await adminApi.post('/reports/', form);
      setMessage('Report added successfully.');
      setForm({ title: '', summary: '', metric_value: '', trend: 'Up', status: 'Healthy' });
    } catch (error) {
      setMessage('Unable to add report.');
    }
  };

  return (
    <div className="main-content">
      <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 10px 28px rgba(0,0,0,0.08)', width:'175vh'}}>
        <h2>Reports</h2>
        <p style={{ color: '#64748b' }}>Track business health with custom report cards.</p>
        <form onSubmit={handleSubmit} style={{ marginTop: '16px', marginBottom:'40px'}}>
          <div style={{ display: 'grid', gap: '12px' }}>
            <input name="title" value={form.title} onChange={handleChange} placeholder="Report title" required style={inputStyle} />
            <textarea name="summary" value={form.summary} onChange={handleChange} placeholder="Summary" rows="3" required style={{ ...inputStyle, minHeight: '90px' }} />
            <input name="metric_value" value={form.metric_value} onChange={handleChange} placeholder="Metric value" required style={inputStyle} />
            <select name="trend" value={form.trend} onChange={handleChange} style={inputStyle}>
              <option value="Up">Up</option>
              <option value="Down">Down</option>
              <option value="Stable">Stable</option>
            </select>
            <select name="status" value={form.status} onChange={handleChange} style={inputStyle}>
              <option value="Healthy">Healthy</option>
              <option value="Warning">Warning</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
          <button type="submit" style={{ marginTop: '12px', padding: '10px 16px', borderRadius: '8px', border: 'none', background: '#0f766e', color: '#fff', cursor: 'pointer' }}>Add Report</button>
          {message && <div style={{ marginTop: '10px', color: '#0f766e' }}>{message}</div>}
        </form>
        <div style={{ marginTop: '20px' }}>
          {reports.map((report) => (
            <div key={report.id} style={{ border: '2px solid #e2e8f0', borderRadius: '10px', padding: '12px', marginBottom: '20px' }}>
              <strong>{report.title}</strong>
              <div style={{ color: '#64748b' }}>{report.summary}</div>
              <small>{report.metric_value} • {report.trend} • {report.status}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const inputStyle = { padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' };

export default PagesTenth;
