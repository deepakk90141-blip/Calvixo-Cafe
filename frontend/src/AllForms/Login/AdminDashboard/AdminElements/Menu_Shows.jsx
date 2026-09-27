import React from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const Menu_Shows = ({ menus = [], onDelete, onView, onEdit }) => {
    return (
        <div className="menu-page">
            <div className="menu-table-card">
                <table className="food-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Food Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menus.map((food) => (
                            <tr key={food.id}>
                                <td>
                                    {food.image_url ? (
                                        <img src={food.image_url} alt={food.name} style={{ width: '56px', height: '56px', objectFit:'cover', borderRadius:'10px' }} />
                                    ) : (
                                        <div style={{ width: '56px', height: '56px', borderRadius:'10px', background:'#f3f4f6', display:'flex', alignItems:'center', justifyContent:'center', color:'#6b7280' }}>No image</div>
                                    )}
                                </td>
                                <td>{food.name}</td>
                                <td>{food.category}</td>
                                <td>₹{food.price}</td>
                                <td>
                                    <span className={food.is_available !== false ? "status available" : "status hidden"}>
                                        {food.is_available !== false ? 'Available' : 'Hidden'}
                                    </span>
                                </td>
                                <td className="buttons">
                                    <button type="button" className="action view" onClick={() => onView?.(food)}><FaEye /></button>
                                    <button type="button" className="action edit" onClick={() => onEdit?.(food)}><FaEdit /></button>
                                    <button type="button" className="action delete" onClick={() => onDelete?.(food.id)}><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Menu_Shows;