import React, { useEffect, useState } from 'react';
import Menu_header from '../AdminElements/Menu_header';
import Menu_Shows from '../AdminElements/Menu_Shows';
import { adminApi } from '../../../../utils/adminApi';

const categoryOptions = ['Burger', 'Momos', 'Pizza', 'Samosa', 'Wraps', 'Beverages', 'Sides', 'Noodles', 'Manchurian'];

const PagesSecond = () => {
    const [menus, setMenus] = useState([]);
    const [form, setForm] = useState({ name: '', category: 'Burger', price: '', is_available: true, image: null });
    const [editForm, setEditForm] = useState({ id: null, name: '', category: 'Burger', price: '', is_available: true, image: null });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const loadMenus = async () => {
        try {
            const response = await adminApi.get('/menus/');
            setMenus(response.data || []);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadMenus();
    }, []);

    const handleChange = (event) => {
        const { name, value, type, checked, files } = event.target;
        if (type === 'file') {
            setForm({ ...form, image: files[0] || null });
            return;
        }
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    };

    const handleEditChange = (event) => {
        const { name, value, type, checked, files } = event.target;
        if (type === 'file') {
            setEditForm({ ...editForm, image: files[0] || null });
            return;
        }
        setEditForm({ ...editForm, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            const payload = new FormData();
            payload.append('name', form.name);
            payload.append('category', form.category);
            payload.append('price', Number(form.price));
            payload.append('is_available', form.is_available ? 'true' : 'false');
            if (form.image) {
                payload.append('image', form.image);
            }

            await adminApi.post('/menus/', payload, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setMessage('Menu item added successfully.');
            setForm({ name: '', category: 'Burger', price: '', is_available: true, image: null });
            await loadMenus();
        } catch (error) {
            setMessage(error.response?.data?.detail || 'Unable to add menu item.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            const payload = new FormData();
            payload.append('name', editForm.name);
            payload.append('category', editForm.category);
            payload.append('price', Number(editForm.price));
            payload.append('is_available', editForm.is_available ? 'true' : 'false');
            if (editForm.image) {
                payload.append('image', editForm.image);
            }

            await adminApi.patch(`/menus/${editForm.id}/`, payload, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setMessage('Menu item updated successfully.');
            setSelectedItem(null);
            setIsEditing(false);
            await loadMenus();
        } catch (error) {
            setMessage(error.response?.data?.detail || 'Unable to update menu item.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this menu item?')) {
            return;
        }
        try {
            await adminApi.delete(`/menus/${id}/`);
            setMenus((prev) => prev.filter((item) => item.id !== id));
            setSelectedItem((prev) => (prev?.id === id ? null : prev));
        } catch (error) {
            console.error(error);
        }
    };

    const handleView = (item) => {
        setSelectedItem(item);
        setIsEditing(false);
    };

    const handleEdit = (item) => {
        setSelectedItem(item);
        setEditForm({
            id: item.id,
            name: item.name,
            category: item.category || 'Burger',
            price: item.price,
            is_available: item.is_available !== false,
            image: null,
        });
        setIsEditing(true);
    };

    const closeDetails = () => {
        setSelectedItem(null);
        setIsEditing(false);
    };

    return (
        <div>
            <main className="main-content" style={{ display: 'block', width: '99%', padding: '20px', flexDirection: 'column', alignContent: 'center', alignItems: 'center', paddingLeft: '30px'}}>
                <Menu_header />
                <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '16px', borderRadius: '12px', marginBottom: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
                    <h3 style={{ marginBottom: '12px' }}>Add New Menu Item</h3>
                    <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
                        <input name="name" placeholder="Food name" value={form.name} onChange={handleChange} required style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                        <select name="category" value={form.category} onChange={handleChange} required style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                            {categoryOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                            <input type="checkbox" name="is_available" checked={form.is_available} onChange={handleChange} />
                            Available
                        </label>
                        <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontWeight: 600 }}>
                            <span>Image</span>
                            <input type="file" name="image" accept="image/*" onChange={handleChange} />
                        </label>
                    </div>
                    <button type="submit" disabled={loading} style={{ marginTop: '12px', padding: '10px 16px', borderRadius: '8px', border: 'none', background: '#0f766e', color: '#fff', cursor: 'pointer' }}>
                        {loading ? 'Adding...' : 'Add Item'}
                    </button>
                    {message && <div style={{ marginTop: '10px', color: '#0f766e' }}>{message}</div>}
                </form>
                <Menu_Shows menus={menus} onDelete={handleDelete} onView={handleView} onEdit={handleEdit} />

                {selectedItem && (
                    <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 1000 }}>
                        <div style={{ background: '#fff', width: '100%', maxWidth: '560px', borderRadius: '16px', padding: '20px', boxShadow: '0 20px 45px rgba(0,0,0,0.2)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                <h3 style={{ margin: 0 }}>{isEditing ? 'Edit Menu Item' : 'Menu Item Details'}</h3>
                                <button type="button" onClick={closeDetails} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '18px' }}>✕</button>
                            </div>

                            {isEditing ? (
                                <form onSubmit={handleUpdate} style={{ display: 'grid', gap: '12px' }}>
                                    <input name="name" value={editForm.name} onChange={handleEditChange} required style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                                    <select name="category" value={editForm.category} onChange={handleEditChange} required style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                                        {categoryOptions.map((option) => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                    <input name="price" type="number" value={editForm.price} onChange={handleEditChange} required style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                                        <input type="checkbox" name="is_available" checked={editForm.is_available} onChange={handleEditChange} />
                                        Available
                                    </label>
                                    <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontWeight: 600 }}>
                                        <span>Replace Image</span>
                                        <input type="file" name="image" accept="image/*" onChange={handleEditChange} />
                                    </label>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button type="submit" disabled={loading} style={{ padding: '10px 14px', borderRadius: '8px', border: 'none', background: '#0f766e', color: '#fff', cursor: 'pointer' }}>
                                            {loading ? 'Updating...' : 'Save Changes'}
                                        </button>
                                        <button type="button" onClick={closeDetails} style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff', cursor: 'pointer' }}>
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div>
                                    {selectedItem.image_url ? (
                                        <img src={selectedItem.image_url} alt={selectedItem.name} style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '12px', marginBottom: '12px' }} />
                                    ) : null}
                                    <p><strong>Name:</strong> {selectedItem.name}</p>
                                    <p><strong>Category:</strong> {selectedItem.category}</p>
                                    <p><strong>Price:</strong> ₹{selectedItem.price}</p>
                                    <p><strong>Status:</strong> {selectedItem.is_available !== false ? 'Available' : 'Hidden'}</p>
                                    <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                                        <button type="button" onClick={() => handleEdit(selectedItem)} style={{ padding: '10px 14px', borderRadius: '8px', border: 'none', background: '#2563eb', color: '#fff', cursor: 'pointer' }}>
                                            Edit
                                        </button>
                                        <button type="button" onClick={() => handleDelete(selectedItem.id)} style={{ padding: '10px 14px', borderRadius: '8px', border: 'none', background: '#dc2626', color: '#fff', cursor: 'pointer' }}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default PagesSecond