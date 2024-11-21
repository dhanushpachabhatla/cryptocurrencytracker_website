import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../../firebase/auth';
import { useAuth } from '../../../contexts/authContext';
import './styles.css';
import websiteLogo from "../../../assets/websiteLogo.png"
const Login = () => {
    const { userLoggedIn, loading } = useAuth(); // Using userLoggedIn and loading from useAuth context
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    useEffect(() => {
        // Handle redirects once userLoggedIn changes
    }, [userLoggedIn]);
    
    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithEmailAndPassword(email, password);
            } catch (error) {
                setErrorMessage('Login failed. Please check your credentials.');
            } finally {
                setIsSigningIn(false);
            }
        }
    };
    
    const onGoogleSignIn = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithGoogle();
            } catch (error) {
                setErrorMessage('Google login failed. Please try again.');
            } finally {
                setIsSigningIn(false);
            }
        }
    };
    
    if (loading) return <div>Loading...</div>; // Prevent rendering while loading
    
    if (userLoggedIn) return <Navigate to="/home" replace={true} />;
    
    return (
        <div className='main-con-login'>
        <div className='con'>
            <div className="website-logo">
                <img  className='website-logo-image' src={websiteLogo} alt="logo" />
                <h5>CryptoRadar.</h5>
            </div>
            <div className="login-container">
                <div className="login-card">
                    <div className="login-header">
                        <h3>LOGIN TO GET STARTED</h3>
                    </div>
                    <form onSubmit={onSubmit} className="login-form">
                        <div className="login-form-group">
                            {/* <label>Email</label> */}
                            <input
                                type="email"
                                autoComplete="email"
                                required
                                placeholder='Enter your Email-ID '
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="login-input-field"
                            />
                        </div>
                        <div className="login-form-group">
                            {/* <label>Password</label> */}
                            <input
                                type="password"
                                autoComplete="current-password"
                                required
                                placeholder='Enter your Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="login-input-field"
                            />
                        </div>
                        {errorMessage && <span className="login-error-message">{errorMessage}</span>}
                        <button
                            type="submit"
                            disabled={isSigningIn}
                            className={isSigningIn ? 'login-signin-submit-btn login-disabled' : 'login-signin-submit-btn'}
                        >
                            {isSigningIn ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                    <p className="login-signup-link">
                        Don't have an account? <Link to="/register">Sign up</Link>
                    </p>
                    <div className="login-divider">OR</div>
                    <button
                        disabled={isSigningIn}
                        onClick={onGoogleSignIn}
                        className={isSigningIn ? 'login-google-btn login-disabled' : 'login-google-btn'}
                    >
                        <svg className="login-google-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_17_40)">
                                <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4" />
                                <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853" />
                                <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04" />
                                <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335" />
                            </g>
                            <defs>
                                <clipPath id="clip0_17_40">
                                    <rect width="48" height="48" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        {isSigningIn ? 'Signing In...' : 'Continue with Google'}
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Login;
