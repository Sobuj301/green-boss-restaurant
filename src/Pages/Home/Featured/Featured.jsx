import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import featuredImg from "../../../assets/home/featured.jpg"
import './Featured.css'
const Featured = () => {
    return (
        <div className="featured-item bg-fixed mt-12">
            <SectionTitle heading="featured"></SectionTitle>
            <div className="flex justify-center items-center gap-10 py-20 px-36">

                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className="text-white"> 
                    <h2 className="font-medium">WHERE CAN I GET SOME?</h2>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam voluptate ad qui quasi. Porro sequi enim similique deserunt cupiditate aliquid ut, praesentium quisquam cumque quam itaque maiores, fuga dolor laborum.</p>
                </div>
            </div>
        </div>
    );
};

export default Featured;