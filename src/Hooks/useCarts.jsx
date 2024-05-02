import {useQuery} from '@tanstack/react-query'
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import useAxiosPublic from './useAxiosPublic';
const useCarts = () => {
    const axiosPublic = useAxiosPublic()
    const {user} = useContext(AuthContext)
    const {refetch,data: carts = []}= useQuery({
        queryKey:['carts',user?.email],
        queryFn:async()=>{
            const res = await axiosPublic.get(`/carts?email=${user.email}`)
            return res.data
        }
    })
    return [carts,refetch]
};

export default useCarts;