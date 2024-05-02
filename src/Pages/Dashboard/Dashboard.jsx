import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../../Hooks/useAdmin';
const Dashboard = () => {
    const [isAdmin] = useAdmin()
   
    return (
        <div className='flex justify-evenly gap-10 max-w-5xl mx-auto'>
            <div className='menu bg-orange-600 w-64 h-screen'>

                {
                    isAdmin ?
                        <>
                            <li><NavLink to="/dashboard/adminHome">ADMIN HOME</NavLink> </li>
                            <li><NavLink to="/dashboard/addItem">ADD ITEM</NavLink> </li>
                            <li><NavLink to="/dashboard/manageItem">MANAGE ITEM</NavLink> </li>
                            <li><NavLink to="/dashboard/users">ALL USERS</NavLink> </li>
                        </>
                        :
                        <>
                            <li><NavLink to="/dashboard/userHome">USER HOME</NavLink> </li>
                            <li><NavLink to="/dashboard/reservation">RESERVATION</NavLink> </li>
                            <li><NavLink to="/dashboard/carts">MY CARTS</NavLink> </li>
                            <li><NavLink to="/dashboard/payment">PAYMENT</NavLink> </li>
                            <li><NavLink to="/dashboard/paymentHistory">PAYMENT HISTORY</NavLink> </li>
                            <li><NavLink to="/dashboard/reviews">ADD REVIEWS</NavLink> </li>
                        </>
                }
                <div className="divider">OR</div>
                <li><NavLink to="/">HOME</NavLink> </li>
                <li><NavLink to="/menu">MENU</NavLink> </li>

            </div>
            <div className='flex-1'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;