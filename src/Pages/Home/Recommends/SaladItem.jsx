import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import useCarts from "../../../Hooks/useCarts";

const SaladItem = ({ item }) => {
    const [,refetch] = useCarts()
    const { name, image, price, recipe, _id } = item
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const handleAddToCart = () => {
        if (!user) {
            Swal.fire({
                title: "You are not logged",
                text: "please login",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login')

                }
            });
        }
        else {
            const cart = {
                cartId: _id,
                email: user?.email,
                name: name,
                image: image,
                price: price,
                recipe: recipe
            }
            axiosPublic.post('/carts', cart)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertedId) {
                        refetch()
                          Swal.fire({
                            title: "Added!",
                            text: `${item.name} added`,
                            icon: "success"
                          });
                    }

                })
        }
    }
    return (
        <div className="card  bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={image} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions">
                    <button onClick={handleAddToCart} className="btn btn-outline">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default SaladItem;