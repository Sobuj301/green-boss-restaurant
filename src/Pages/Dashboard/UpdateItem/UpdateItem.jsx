import { useForm } from "react-hook-form";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import {useLoaderData} from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from 'sweetalert2'

const image_hosting_api='https://api.imgbb.com/1/upload?key=a96b9b7072ca6b6c71f200eba29ba07b'
const UpdateItem = () => {

    const menu = useLoaderData()

    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit,reset } = useForm()
    const onSubmit = async(data) =>{ 
        console.log(data)
        const imgFile = {image:data.image[0]}
        const res = await axiosPublic.post(image_hosting_api,imgFile,{
            headers:{
                "content-type":"multipart/form-data"
            }
        })
        console.log(res.data)
        if(res.data.success){

            const updateDoc ={
                name:data.name,
                category:data.category,
                price:data.price,
                image:res.data.data.display_url,
                recipe:data.recipe
            }
            axiosSecure.patch(`/menu/${menu._id}`,updateDoc)
            .then(res =>{
                console.log(res.data)
                if(res.data.modifiedCount > 0){
                    reset()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${menu.name} updated`,
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
            })
        }
    
    }
    return (
        <div>
            <SectionTitle heading='update an item'></SectionTitle>

            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Recipe Name</span>
                    </div>
                    <input {...register("name")} type="text"defaultValue={menu.name} className="input input-bordered w-full" />
                </label>
                <div className="flex gap-5">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Category</span>
                        </div>
                        <select defaultValue={menu.category} {...register("category")} className="select select-bordered">
                            <option value="pizza">Pizza</option>
                            <option value="dessert">Dessert</option>
                            <option value="soups">Soup</option>
                            <option value="salad">Salad</option>
                            <option value="drinks">Drinks</option>
                        </select>
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Price</span>
                        </div>
                        <input defaultValue={menu.price} {...register("price")} type="number" placeholder="Type here" className="input input-bordered w-full" />
                    </label>
                </div>
                <label className="form-control">
                    <div className="label">
                        <span className="label-text">Recipe</span>
                    </div>
                    <textarea defaultValue={menu.recipe} {...register('recipe')} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                </label>

                <input {...register('image')} type="file" className="file-input w-full mt-5" />
                <input className="btn btn-neutral mt-4" type="submit" value="Update Item" />
            </form>
        </div>
    );
};

export default UpdateItem;