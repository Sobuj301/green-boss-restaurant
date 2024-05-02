import useMenu from "../../../Hooks/useMenu";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import PopularItem from "./PopularItem";

const MenuItem = () => {

    const [menu] = useMenu()
    const popularItem = menu.filter(item => item.category === "popular")
    return (
        <div>
            <SectionTitle heading="from our menu" subHeading="check out it"></SectionTitle>
            <div className="md:max-w-5xl mx-auto grid grid-cols-2  gap-4">
                {
                    popularItem.map(item => <PopularItem key={item._id} item={item}></PopularItem>)
                }
            </div>
        </div>
    );
};

export default MenuItem;