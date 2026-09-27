import React from "react";

import {
  FaBox,
  FaRupeeSign,
  FaUsers,
  FaStar,
} from "react-icons/fa";

import { dashboardCardData } from '../../../../components/AllDatas/AllDatas'



const DashboardCard = () => {


  return (

    <div className="dashboard-cards">


      {
        dashboardCardData.map((item, index) => (


          <div
            className="dashboard-card"
            key={index}
          >


            <div
              className="card-icon"
              style={{
                background: item.color
              }}
            >

              {item.icon}

            </div>



            <div className="card-content">


              <h4>
                {item.title}
              </h4>


              <h2>
                {item.value}
              </h2>


              <p>
                {item.growth}
              </p>


            </div>



          </div>


        ))
      }


    </div>

  );

};


export default DashboardCard;