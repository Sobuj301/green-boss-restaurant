import { useForm } from "react-hook-form";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from 'sweetalert2'



const image_hosting_api='https://api.imgbb.com/1/upload?key=a96b9b7072ca6b6c71f200eba29ba07b'
const AddItem = () => {
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit,reset } = useForm()
    const onSubmit = async(data) => {
        console.log(data)
        const imgFile ={image:data?.image[0]}
        const res =await axiosPublic.post(image_hosting_api,imgFile,{
            headers:{
                "content-type":"multipart/form-data"
            }
        })
        console.log(res.data)
        if(res.data.success){
            const addItem = {
                name:data.name,
                category:data.category,
                price:data.price,
                recipe:data.recipe,
                image:res.data.data.display_url
            }
            axiosSecure.post('/menu',addItem)
            .then(res =>{
                console.log(res.data)
                if(res.data.insertedId){
                    reset()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${data.name} new added`,
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
            })
        }
        
    }
    return (
        <div>
            <SectionTitle subHeading="what's  new" heading="add an item"></SectionTitle>
            <form onSubmit={handleSubmit(onSubmit)}>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Recipe Name</span>
                    </div>
                    <input {...register("name")} type="text" placeholder="Type here recipe name" className="input input-bordered w-full" />
                </label>
                <div className="flex gap-3">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Category</span>
                        </div>
                        <select {...register("category")} className="select select-bordered">
                            <option value="pizza">Pizza</option>
                            <option value="dessert">Dessert</option>
                            <option value="soup">Soup</option>
                            <option value="drinks">Drinks</option>
                            <option value="salad">Salad</option>
                        </select>
                    </label>

                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Price</span>
                        </div>
                        <input {...register("price")} type="number" className="input input-bordered w-full" />
                    </label>
                </div>

                <label className="form-control">
                    <div className="label">
                        <span className="label-text">Your bio</span>
                    </div>
                    <textarea {...register('recipe')} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                </label>

                <input {...register('image')} type="file" className="file-input w-full mt-5" />

                <input className="btn btn-neutral text-black mt-4" type="submit" value="Add Item" />
            </form>
        </div>
    );
};

export default AddItem;