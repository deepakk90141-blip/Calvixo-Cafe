import React, { useEffect, useState } from 'react';
import { adminApi } from '../../../../utils/adminApi';
import SalesChartMonthly from '../AdminElements/SalesChartMonthly';
import SaleChartYearly from '../AdminElements/SaleChartYearly';
import PopularFoods from '../AdminElements/PopulerFoods';
import RecentOrders from '../AdminElements/RecentOrders';
import DeliveryStatus from '../AdminElements/DeliveryStatus';

const PagesFirst = ({ admin, stats }) => {
  const [orders, setOrders] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [ordersResponse, restaurantsResponse, partnersResponse] = await Promise.all([
          adminApi.get('/orders/'),
          adminApi.get('/restaurants/'),
          adminApi.get('/delivery-partners/'),
        ]);
        setOrders(ordersResponse.data || []);
        setRestaurants(restaurantsResponse.data || []);
        setPartners(partnersResponse.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    load();
  }, []);

  return (
    <div className="main-content" style={{ display: 'block', width: '80%', padding: '20px', flexDirection: 'column', alignContent: 'center', alignItems: 'center', paddingLeft: '30px' }}>
      <div style={{ width: '100%', display: 'flex', paddingLeft: '30px', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h2>Welcome : {admin?.username || 'Admin'} 👋</h2>
        <div style={{ fontSize: '14px', color: '#64748b' }}>
          {stats?.orders || orders.length || 0} orders • {stats?.restaurants || restaurants.length || 0} restaurants • {stats?.deliveryPartners || partners.length || 0} partners
        </div>
      </div>
      <SalesChartMonthly orders={orders} />
      <SaleChartYearly orders={orders} />
      <PopularFoods orders={orders} />
      <RecentOrders orders={orders} />
      <DeliveryStatus orders={orders} partners={partners} />
    </div>
  );
};

export default PagesFirst