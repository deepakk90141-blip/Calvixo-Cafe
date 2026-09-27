import React from 'react'

const Menu_Navbar = ({ food, setFood, categories = [] }) => {
  return (
    <div className="menu-navbar">
      <div className="header">
        <button
          className={food === "All" ? "active" : ""}
          onClick={() => setFood("All")}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category}
            className={food === category ? "active" : ""}
            onClick={() => setFood(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu_Navbar;