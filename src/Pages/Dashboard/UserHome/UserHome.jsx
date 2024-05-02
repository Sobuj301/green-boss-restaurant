import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";

const UserHome = () => {
    const {user} = useContext(AuthContext)
    return (
        <div>
            <h2 className="text-2xl mt-10">Hi welcome {
                user?.displayName ? user.displayName : 'back'
                }</h2>
        </div>
    );
};

export default UserHome;