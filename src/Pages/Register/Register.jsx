import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";



const Register = () => {
    const {createUser,userUpdateProfile,logout} = useContext(AuthContext)
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()
   
    const {register,handleSubmit,reset,formState: { errors }} = useForm()
    const onSubmit = (data) => {
        createUser(data.email,data.password)
        .then(result =>{
            const user = result.user
            console.log(user)
            userUpdateProfile(data.name,data.photo)
            .then(result =>{

                const userInfo ={
                    name: data.name,
                    email: data.email
                }
                 axiosPublic.post('/users',userInfo)
                 .then(res =>{
                    console.log(res.data)
                 })
                console.log("update",result)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is singUp`,
                    showConfirmButton: false,
                    timer: 1500
                  });
                  reset()
                  logout()
                  .then(result =>{
                    console.log(result)
                  })
                  .catch(err =>{
                    console.log(err.message)
                  })
                  navigate('/login')
            })
            .catch(err =>{
                console.log(err.message)
            })
            
            
        })
        .catch(err =>{
            console.log(err.message)
        })
        console.log(data)
    }
    return (
        <div className="hero min-h-screen bg-base-200 max-w-5xl mx-auto">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">SingUp</h1>
                   
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" {...register("name")} placeholder="name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo</span>
                            </label>
                            <input type="url" {...register("photo")} placeholder="photo" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" {...register("email")} placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" {...register("password")} placeholder="password" className="input input-bordered" required /> 
                        </div>
                        <div className="form-control mt-6">
                          <input className="btn btn-primary" type="submit" value="SING UP" />
                        </div>
                    </form>
                    <Link to="/login"><p className="flex justify-center mb-6 font-sans text-sm antialiased font-light leading-normal text-inherit">
              Already have account?please login
            </p></Link>
                </div>
            </div>
        </div>
    );
};

export default Register;