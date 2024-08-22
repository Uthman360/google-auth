import React, { useState, useEffect } from 'react';
import {
    onAuthStateChanged,
    signInWithPopup,
    getAuth,
    GoogleAuthProvider,
    signOut,
} from "firebase/auth";
import { app } from "../firebase";

const GoogleAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [auth]);

    const handleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            // The signed-in user info.
            const user = result.user;
            console.log("User signed in:", user);
        } catch (error) {
            console.error("Error signing in:", error);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log("User signed out");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {user ? (
                <div>
                    <div class="profile-card">
                        <h3>Welcome</h3>
                        <div class="profile-picture">
                            <img src={user.photoURL} alt="Profile Picture" />
                        </div>
                        <div class="profile-info">
                            <h2>Name: {user.displayName}</h2>
                            <p>Email: {user.email}</p>
                        </div>
                        <button onClick={handleSignOut}>Sign Out</button>
                    </div>
                </div>
            ) : (
                <button onClick={handleSignIn} class="google-sign-in-button">
                    <img src="google.png" alt="Google Logo" />
                    Sign in with Google
                </button>)}
        </div>
    );
};

export default GoogleAuth;