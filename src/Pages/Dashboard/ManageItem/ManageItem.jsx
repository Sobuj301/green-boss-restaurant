import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useMenu from "../../../Hooks/useMenu";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import Swal from 'sweetalert2'

const ManageItem = () => {
    const [menu,refetch] = useMenu()
    const axiosSecure = useAxiosSecure()

    const handleDeleteItem = item =>{
        axiosSecure.delete(`/menu/${item._id}`)
        .then(res =>{
            console.log(res.data)
            if(res.data.deletedCount > 0){
                refetch()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }
    return (
        <div>
            <SectionTitle subHeading="hurry up!" heading="manage all item"></SectionTitle>
            <h2 className="text-xl font-medium">Total Item: {menu.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>IMAGE</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>UPDATE</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            menu.map((item,index) =>  <tr key={item._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                   {item.name}
                                </td>
                                <td>${item.price}</td>
                                <th>
                                   <Link to={`/dashboard/updateItem/${item._id}`}><button>edit</button></Link>
                                </th>
                                <th>
                                    <button onClick={()=>handleDeleteItem(item)}>delete</button>
                                </th>
                            </tr>)
                        }
                       
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageItem;