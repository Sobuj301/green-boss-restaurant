import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import { loadStripe } from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe('pk_test_51P3m1CFehRfyAwwmebiv5xammZzPmJCJTPys1QXM9NOh4hpjNzegSYQfe0Gwj50Mf32O9KO6mbd662NM0MotdEHH00QMM92IHo')
const Payment = () => {
    return (
        <div>
            <SectionTitle heading='payment'></SectionTitle>

            <Elements stripe={stripePromise}>
                 <CheckOutForm></CheckOutForm>
            </Elements>

        </div>
    );
};

export default Payment;