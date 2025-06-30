/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react"
import app from './firebase.config';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth"


export const AuthContext = createContext(null)
const auth = getAuth(app)


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)


    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile);
    };

    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    };

    const signOutUser = async () => {
        setLoading(true)
        return await signOut(auth)
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setLoading(false)
            setUser(currentUser)
            console.log("Current User:", currentUser);
        });
        return () => {
            unSubscribe()
        };
    }, [])

    const userInfo = {
        user,
        loading,
        createUser,
        updateUserProfile,
        signInUser,
        signOutUser,
    }

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;