import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../Firebase/FirebaseConfig";
import useAxiosSecure from "../Hooks/useAxiosSecure";
const googleProvider = new GoogleAuthProvider();
export const AuthContext = createContext(null)
const auth = getAuth(app)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const axiosSecure = useAxiosSecure()

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        setLoading(true)
        return signOut(auth)
    }

    const googleLogin = () => {
        setLoading(false)
        return signInWithPopup(auth, googleProvider)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            console.log("current user", currentUser)
           
            if (currentUser) {
                const userInfo = {
                    email: currentUser.email
                }
                axiosSecure.post('/jwt',userInfo)
                .then(res =>{
                    const token = res.data.token
                    console.log(token,'token')
                    localStorage.setItem("token",token)
                    setLoading(false)
                   
                })
            }
            else {
                localStorage.removeItem('token')
                setLoading(false)
            }
           

        })
        return () => {
            return unsubscribe()
        }
    }, [axiosSecure])


    const userUpdateProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }


    const authInfo = {
        user,
        loading,
        createUser,
        login,
        logout,
        userUpdateProfile,
        googleLogin
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;