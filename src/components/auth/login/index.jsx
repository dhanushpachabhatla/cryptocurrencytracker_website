import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { doSignInWithEmailAndPassword } from '../../../firebase/auth';
import { useAuth } from '../../../contexts/authContext';
import './styles.css';
import websiteLogo from "../../../assets/websiteLogo.png";

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
    
    if (loading) return <div>Loading...</div>; // Prevent rendering while loading
    
    if (userLoggedIn) return <Navigate to="/home" replace={true} />;
    
    return (
        <div className='main-con-login'>
        <div className='con'>
            <div className="website-logo">
                <img className='website-logo-image' src={websiteLogo} alt="logo" />
                <h5>CryptoRadar.</h5>
            </div>
            <div className="login-container">
                <div className="login-card">
                    <div className="login-header">
                        <h3>LOGIN TO GET STARTED</h3>
                    </div>
                    <form onSubmit={onSubmit} className="login-form">
                        <div className="login-form-group">
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
                </div>
            </div>
        </div>
        </div>
    );
};

export default Login;
