import React from "react";
import { FaPlus } from "react-icons/fa";

const Menu_header = () => {
    return (
        <div className="menu-management">

            <div className="menu-header">

                <div>
                    <h2>
                        🍔 Menu Management  
                    </h2>

                    <p>
                        Manage your food menu, categories & pricing.
                    </p>
                </div>


                <button className="add-item-btn">
                    <FaPlus />
                    Add New Item
                </button>

            </div>


        </div>
    );
};

export default Menu_header;