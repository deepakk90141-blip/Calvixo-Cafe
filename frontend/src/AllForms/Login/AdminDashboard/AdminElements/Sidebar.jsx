import React from "react";
import CalvixoLogo from '../../../../components/CalvixoLogo'

import {
  FaHome,
  FaHamburger,
  FaBox,
  FaMotorcycle,
  FaUsers,
  FaBirthdayCake,
  FaNewspaper,
  FaStar,
  FaTicketAlt,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";


const Sidebar = ({setRoutes}) => {


  const menuItems = [

    {
      title: "Dashboard",
      icon: <FaHome />
    },

    {
      title: "Menu Management",
      icon: <FaHamburger />
    },

    {
      title: "Orders",
      icon: <FaBox />
    },

    {
      title: "Delivery Partners",
      icon: <FaMotorcycle />
    },

    {
      title: "Customers",
      icon: <FaUsers />
    },

    {
      title: "Party Bookings",
      icon: <FaBirthdayCake />
    },

    {
      title: "News & Blogs",
      icon: <FaNewspaper />
    },

    {
      title: "Reviews",
      icon: <FaStar />
    },

    {
      title: "Coupons",
      icon: <FaTicketAlt />
    },

    {
      title: "Reports",
      icon: <FaChartLine />
    },

    {
      title: "Settings",
      icon: <FaCog />
    },

  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2 style={{marginTop:'10px'}}>
          <CalvixoLogo width={190} height={50}/>
        </h2>
        <span>
          Admin Panel
        </span>
      </div>
      <nav className="sidebar-menu">
        {
          menuItems.map((item, index) => (
            <button
              onClick={() => setRoutes(item.value)}
              className={
                index === 0
                  ? "active menu-link"
                  : "menu-link"
              }

              key={index}
            >

              <span className="menu-icon">
                {item.icon}
              </span>


              <span>
                {item.title}
              </span>


            </button>

          ))
        }



      </nav>



      <div className="logout">


        <button>

          <FaSignOutAlt />

          Logout

        </button>


      </div>



    </aside>

  );

};


export default Sidebar;