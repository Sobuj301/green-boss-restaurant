import useMenu from "../../../Hooks/useMenu";
import SaladItem from "./SaladItem";

const Recommends = () => {

    const [menu] = useMenu()
    const saladItem = menu.filter(item => item.category === "salad")
    return (
        <div className="md:max-w-5xl mx-auto grid grid-cols-3 gap-5 mt-20">
            {
                saladItem.splice(0,6).map(item =><SaladItem key={item._id} item={item}></SaladItem>)
            }
        </div>
    );
};

export default Recommends;