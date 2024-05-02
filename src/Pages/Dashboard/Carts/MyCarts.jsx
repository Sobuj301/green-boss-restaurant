import { Link } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useCarts from "../../../Hooks/useCarts";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import Swal from 'sweetalert2'

const MyCarts = () => {
    const [carts,refetch] = useCarts()
    const axiosPublic = useAxiosPublic()

    const totalPrice = carts.reduce((current, item) => current + item.price, 0)
    const handleDelete = item => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/carts/${item._id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: `${item.name} delete successfully`,
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }

    return (
        <div>
            <SectionTitle heading="My carts"></SectionTitle>

            <div className="flex justify-between">
                <h2>Total: {carts.length}</h2>
                <h2>Total Price:$ {totalPrice} </h2>
               {
                carts.length ? <Link to="/dashboard/payment"> <button className="btn">Pay</button></Link> :<button className="btn-disabled" disabled>pay</button>
               }
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>IMAGE</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            carts.map((item, index) => <tr key={item._id}>
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
                                <td>{item.price}</td>
                                <th>
                                    <button onClick={() => handleDelete(item)} className="btn btn-ghost btn-xs">remove</button>
                                </th>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default MyCarts;