import React, { useEffect, useState } from 'react';
import { adminApi } from '../../../../utils/adminApi';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await adminApi.get('/customers/');
        setCustomers(response.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    load();
  }, []);

  return (
    <div className="customer-details-page">
      <div className="customer-details-card">
        <div className="customer-details-header">
          <h2>Customers</h2>
          <span>{customers.length} registered</span>
        </div>
        <div className="orders-table">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.full_name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.mobile_no}</td>
                  <td>{customer.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerManagement;
