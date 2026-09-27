import React, { useEffect, useState } from 'react';
import HeadPage from './PagesOfAdminDashboard/HeadPage';
import { adminApi } from '../../../utils/adminApi';
import { clearAdminToken } from '../../../utils/adminAuth';

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [meResponse, dashboardResponse] = await Promise.all([
          adminApi.get('/auth/admin/me/'),
          adminApi.get('/dashboard/'),
        ]);
        setAdmin(meResponse.data.user);
        setStats(dashboardResponse.data.stats);
      } catch (error) {
        clearAdminToken();
        window.location.href = '/admin/login';
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return <div style={{ padding: '24px', fontSize: '18px' }}>Loading admin panel...</div>;
  }

  return (
    <div>
      <HeadPage admin={admin} stats={stats} />
    </div>
  );
};

export default AdminDashboard;