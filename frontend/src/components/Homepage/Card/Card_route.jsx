import Momos_card from "../../elements/card-items/Momos";
import Card_Samosa from "../../elements/card-items/Samosa";
import Card_Manchurian from "../../elements/card-items/Manchurian";
import Card_Burger from "../../elements/card-items/Burger";

const Card_route = ({ category }) => {
    switch (category) {
        case "samosa":
            return <Card_Samosa />;

        case "manchurian":
            return <Card_Manchurian />;

        case "burger":
            return <Card_Burger />;

        default:
            return <Momos_card />;
    }
};

export default Card_route;