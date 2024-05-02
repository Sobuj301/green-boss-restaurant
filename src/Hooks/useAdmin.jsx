import {useQuery} from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';


const useAdmin = () => {
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const {isPending,data :isAdmin = false}=useQuery({
        queryKey:['isAdmin',user?.email],
        queryFn:async()=>{
            const res = await axiosSecure.get(`/users/admin/${user?.email}`)
            return res.data.isAdmin
        }
    })
    return [isAdmin,isPending]
};

export default useAdmin;