import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import useCarts from "../../Hooks/useCarts";
import useAdmin from "../../Hooks/useAdmin";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext)
    const [isAdmin] = useAdmin()
    const [carts] = useCarts()
    console.log(user)
    const handleLogout = () => {
        logout()
            .then(result => {
                console.log(result.user)
            })
            .catch(err => {
                console.log(err.message)
            })
    }
    const links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/menu'>Menu</NavLink></li>
        <li><NavLink to='/order/salad'>Order</NavLink></li>
        <li><NavLink to="/dashboard/carts"><div className="badge badge-secondary">+{carts.length}</div></NavLink></li>
        
        {
           user && isAdmin && <li><NavLink to='/dashboard/adminHome'>Dashboard</NavLink></li>
        }
        {
           user && !isAdmin && <li><NavLink to='/dashboard/userHome'>Dashboard</NavLink></li>
        }


       
    </>
    return (
        <div>
            <div className="navbar bg-black fixed z-30 text-white bg-opacity-30 ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-2">
                            {links}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">GREEN BOSS RESTAURANT</a>
                </div>
                <div className="navbar-center hidden lg:flex ">
                    <ul className="menu menu-horizontal px-1 space-x-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                {
            user?.email ? <>
                
                <p>{user?.displayName}</p>
                <button onClick={handleLogout} className="btn mr-10 ml-3">Logout</button>
                
            </> : <>
               <button className="btn mr-10"><NavLink to='/login'>Login</NavLink></button>
            </>
        }
                </div>
            </div>
        </div>
    );
};

export default Navbar;