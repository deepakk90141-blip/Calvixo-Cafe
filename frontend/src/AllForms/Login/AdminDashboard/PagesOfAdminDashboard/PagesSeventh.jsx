import React, { useEffect, useState } from 'react';
import { adminApi } from '../../../../utils/adminApi';

const PagesSeventh = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: '', category: '', excerpt: '', content: '', is_published: true });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const loadBlogs = async () => {
    try {
      const response = await adminApi.get('/news-blogs/');
      setBlogs(response.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => { loadBlogs(); }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await adminApi.post('/news-blogs/', form);
      setMessage('Blog created successfully.');
      setForm({ title: '', category: '', excerpt: '', content: '', is_published: true });
      loadBlogs();
    } catch (error) {
      setMessage('Unable to create blog.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 10px 28px rgba(0,0,0,0.08)', width:"170vh"}}>
        <h2>News & Blogs</h2>
        <p style={{ color: '#64748b' }}>Create and manage site news, stories, and announcements.</p>
        <form onSubmit={handleSubmit} style={{ marginTop: '16px' }}>
          <div style={{ display: 'grid', gap: '12px', marginBottom:'20px'}}>
            <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required style={inputStyle} />
            <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required style={inputStyle} />
            <input name="excerpt" value={form.excerpt} onChange={handleChange} placeholder="Excerpt" style={inputStyle} />
            <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" rows="5" required style={{ ...inputStyle, minHeight: '120px' }} />
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
              <input type="checkbox" name="is_published" checked={form.is_published} onChange={handleChange} />
              Publish immediately
            </label>
          </div>
          <button type="submit" disabled={loading} style={{ marginTop: '12px', padding: '10px 16px', borderRadius: '8px', border: 'none', background: '#0f766e', color: '#fff', cursor: 'pointer' }}>
            {loading ? 'Saving...' : 'Create Blog'}
          </button>
          {message && <div style={{ marginTop: '10px', color: '#0f766e' }}>{message}</div>}
        </form>
        <div style={{ marginTop: '30px' }}>
          {blogs.map((blog) => (
            <div key={blog.id} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px', marginBottom: '20px' }}>
              <h4>{blog.title}</h4>
              <p style={{ color: '#64748b', margin: '6px 0' }}>{blog.excerpt || blog.content}</p>
              <small>{blog.category} • {blog.is_published ? 'Published' : 'Draft'}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const inputStyle = { padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' };

export default PagesSeventh;
