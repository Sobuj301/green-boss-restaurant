import { Link } from "react-router-dom";
import Cover from "../../../Shared/Cover/Cover";
import PopularItem from "../../Home/MenuItem/PopularItem";

const MenuCategory = ({ items,img,title}) => {
    return (
        <div className="">
            {
                title && <Cover img={img} title={title}></Cover>
            }
            <div className="grid grid-cols-2 max-w-5xl mx-auto gap-5 mt-6">
                {
                    items.map(item => <PopularItem key={item._id} item={item}></PopularItem>)
                }
            </div>
            <div className="max-w-5xl mx-auto mt-3 mb-10">
               <Link to={`/order/${title}`}> <button className="btn btn-outline">Buy Now</button></Link>
            </div>
        </div>
    );
};

export default MenuCategory;