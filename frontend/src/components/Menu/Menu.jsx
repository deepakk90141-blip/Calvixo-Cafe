import { useEffect, useState } from "react";
import Menu_items from "./menu_all/Menu_items";
import Menu_Navbar from "./menu_all/Menu_Nevbar";
import api from '../../utils/api';

const Menu = () => {
  const [food, setFood] = useState("All");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await api.get('/menus/public/');
        const items = response.data?.data || [];
        const uniqueCategories = [...new Set(items.map((item) => item.category).filter(Boolean))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error(error);
      }
    };

    loadCategories();
  }, []);

  return (
    <div className="menubar">
      <Menu_Navbar setFood={setFood} food={food} categories={categories} />
      <Menu_items food={food} />
    </div>
  );
};

export default Menu;