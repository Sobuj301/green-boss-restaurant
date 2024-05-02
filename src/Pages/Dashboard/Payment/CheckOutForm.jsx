import {useStripe,useElements,CardElement
} from '@stripe/react-stripe-js';
import { useContext, useEffect, useState } from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import useCarts from '../../../Hooks/useCarts';
import { AuthContext } from '../../../Provider/AuthProvider';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';


const CheckOutForm = () => {
    const {user} = useContext(AuthContext)
    const [error,setError] = useState('')
    const [clientSecret,setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState()
    const navigate = useNavigate()

    const axiosPublic = useAxiosPublic()
    const [carts,refetch] = useCarts()
    const totalPrice = carts.reduce((total,item,)=> total + item.price,0);
    console.log(totalPrice,"this is tolal price")
    useEffect(()=>{
        if(totalPrice > 0){
            axiosPublic.post('/create-payment-intent',{price:totalPrice})
            .then(res =>{
               console.log(res.data)
               setClientSecret(res.data.clientSecret) 
              
            })
        }
    },[])

    const stripe = useStripe()
    const elements = useElements()
    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const {error,paymentMethod} =await stripe.createPaymentMethod({
            type:"card",
            card,
        })

        if(error){
            console.log("payment error",error)
            setError(error.message)
        }
        else{
            console.log("paymentMethod",paymentMethod)
            setError('')
        }


        const {paymentIntent,error : confirmError} = await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:card,
                billing_details:{
                    email:user?.email,
                    name:user?.displayName
                }
            }
        })

        if(confirmError){
            console.log('confirm error',confirmError)
        }
        else{
            console.log(paymentIntent,'payment intent')
            if(paymentIntent.status === "succeeded"){
                console.log('transaction id',paymentIntent.id)
                setTransactionId(paymentIntent.id)

               const payment = {
                email:user.email,
                price:totalPrice,
                date:new Date(),
                cartIds:carts.map(item =>item._id),
                menuIds:carts.map(item =>item.cartId),
                status:'pending',
                transactionId:paymentIntent.id
               }

               
               const res = await axiosPublic.post('/payment',payment)
               console.log(res.data,"saved data")
               refetch()
               if(res.data?.paymentResult?.insertedId){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "payment successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  navigate('/dashboard/paymentHistory')
               }
            }
        }

    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className='btn btn-primary btn-xs mt-5' type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className='text-red-500'>{error}</p>
             {
                transactionId && <p>{transactionId}</p>
             }
        </form>
    );
};

export default CheckOutForm;