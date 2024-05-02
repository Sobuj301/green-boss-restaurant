import useMenu from "../../../Hooks/useMenu";
import Cover from "../../../Shared/Cover/Cover";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import coverImg from '../../../assets/menu/banner3.jpg'
import MenuCategory from "../MenuCategory/MenuCategory";

import dessertImg from "../../../assets/menu/dessert-bg.jpeg"
import pizzaImg from "../../../assets/menu/pizza-bg.jpg"
import saladImg from "../../../assets/menu/salad-bg.jpg"
import soupsImg from "../../../assets/menu/soup-bg.jpg"

const Menu = () => {

    const [menu] = useMenu()
    const offered = menu.filter(item => item.category === "offered")
    const desserts = menu.filter(item => item.category === "dessert")
    const pizzas = menu.filter(item => item.category === "pizza")
    const soups = menu.filter(item => item.category === "soup")
    const salads = menu.filter(item => item.category === "salad")

    return (
        <div className="">
            <Cover img={coverImg} title="our menu"></Cover>

            <SectionTitle heading="today's offered" subHeading="don't miss"></SectionTitle>
            <MenuCategory items={offered}></MenuCategory>
            <MenuCategory items={desserts} title="dessert" img={dessertImg}></MenuCategory>
            <MenuCategory items={pizzas} title="pizza" img={pizzaImg}></MenuCategory>
            <MenuCategory items={soups} title="soup" img={soupsImg}></MenuCategory>
            <MenuCategory items={salads} title="salad" img={saladImg}></MenuCategory>
            
        </div>
    );
};

export default Menu;