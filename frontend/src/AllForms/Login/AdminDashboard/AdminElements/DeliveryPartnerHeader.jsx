import React from "react";
import {
    Search,
    UserPlus,
    Bike,
    CheckCircle,
    Truck,
    Power,
    Star
} from "lucide-react";


const DeliveryPartnerHeader = ({ partnersCount = 0 }) => {

    return (

        <div className="delivery-partner-page">


            {/* Header */}

            <div className="delivery-partner-header">


                <div className="delivery-header-left">

                    <h2>
                        🚚 Delivery Partner Management
                    </h2>

                    <p>
                        Manage delivery executives, assign orders and track their performance.
                    </p>

                </div>



                <div className="delivery-header-right">


                    <div className="partner-search">

                        <Search size={18} />

                        <input
                            type="text"
                            placeholder="Search Partner"
                        />

                    </div>



                    <button className="add-partner-btn">

                        <UserPlus size={18} />

                        Add New Partner

                    </button>


                </div>


            </div>





            {/* Stats */}


            <div className="partner-stats">


                <div className="partner-card">

                    <div className="partner-icon">
                        <Bike />
                    </div>

                    <div>
                        <span>Total Rider</span>
                        <h2>{partnersCount}</h2>
                    </div>

                </div>




                <div className="partner-card available">

                    <div className="partner-icon">
                        <CheckCircle />
                    </div>

                    <div>
                        <span>Available</span>
                        <h2>12</h2>
                    </div>

                </div>




                <div className="partner-card delivering">

                    <div className="partner-icon">
                        <Truck />
                    </div>

                    <div>
                        <span>Delivering</span>
                        <h2>18</h2>
                    </div>

                </div>





                <div className="partner-card offline">

                    <div className="partner-icon">
                        <Power />
                    </div>

                    <div>
                        <span>Offline</span>
                        <h2>5</h2>
                    </div>

                </div>





                <div className="partner-card rating">

                    <div className="partner-icon">
                        <Star />
                    </div>

                    <div>
                        <span>Avg Rating</span>
                        <h2>4.8★</h2>
                    </div>

                </div>



            </div>



        </div>

    )
}


export default DeliveryPartnerHeader;