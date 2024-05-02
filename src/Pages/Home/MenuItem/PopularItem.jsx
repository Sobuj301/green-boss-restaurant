
const PopularItem = ({item}) => {
    const {name,price,image,recipe} = item
    return (
        <div className="flex space-x-4">
            <div>
                <img style={{borderRadius:"0px 200px 200px 200px"}} className="w-[120px]" src={image} alt="" />
            </div>
            <div>
                <h2>{name}</h2>
                <p>{recipe}</p>
            </div>
            <div>
                <p className="text-yellow-600">${price}</p>
            </div>
        </div>
    );
};

export default PopularItem;