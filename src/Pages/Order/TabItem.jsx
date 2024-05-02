import SaladItem from "../Home/Recommends/SaladItem";

const TabItem = ({items,title}) => {
    return (
        <div className="grid grid-cols-3 gap-5">
            {
                items.map(item => <SaladItem key={item._id} item={item}></SaladItem>)
            }
        </div>
    );
};

export default TabItem;