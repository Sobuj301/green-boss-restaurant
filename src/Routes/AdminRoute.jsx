import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAdmin from "../Hooks/useAdmin";
import { Navigate } from "react-router-dom";

const AdminRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext)
    const [isAdmin,isPending] = useAdmin()

    if(loading || isPending){
        return <progress className="progress w-56"></progress>
    }

    if(user.email && isAdmin){
       return children
    }
    return <Navigate to="/login"></Navigate>
};

export default AdminRoute;