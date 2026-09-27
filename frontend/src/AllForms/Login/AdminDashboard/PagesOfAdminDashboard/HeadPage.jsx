import { useState } from 'react'
import SidebarPages from './SidebarPages'
import AdminRoute from './AdminRoute'

const HeadPage = ({ admin, stats }) => {
    const [routes, setRoutes] = useState('PagesFirst')

    return (
        <div className='layout'>
            <div className="side">
                <AdminRoute routes={routes} admin={admin} stats={stats} />
                <SidebarPages setRoutes={setRoutes} admin={admin} currentRoute={routes} />
            </div>
        </div>
    )
}

export default HeadPage