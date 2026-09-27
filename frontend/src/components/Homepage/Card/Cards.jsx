import { useState } from "react";
import Card_link from "./Card_link";
import Card_route from "./Card_route";

const Cards = () => {
  const [category, setCategory] = useState("momos");

  return (
    <div className="cards">
      <Card_link setCategory={setCategory} />
      <Card_route category={category} />
    </div>
  );
};

export default Cards;