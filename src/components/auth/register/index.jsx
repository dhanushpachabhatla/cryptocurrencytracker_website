// index.jsx (Register page)

import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContext';
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth';
import './styles.css';
import websiteLogo from '../../../assets/websiteLogo.png';

const Register = () => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isRegistering && password === confirmPassword) {
            setIsRegistering(true);
            try {
                await doCreateUserWithEmailAndPassword(email, password);
            } catch (error) {
                setErrorMessage('Registration failed. Please try again.');
            } finally {
                setIsRegistering(false);
            }
        } else {
            setErrorMessage("Passwords don't match.");
        }
    };

    if (userLoggedIn) return <Navigate to="/home" replace={true} />;

    return (
        <div className="main-con">
            <div className="con">
                <div className="website-logo">
                    <img className="website-logo-image" src={websiteLogo} alt="logo" />
                    <h5>CryptoRadar.</h5>
                </div>
                <div className="login-container">
                    <div className="login-card">
                        <div className="login-header">
                            <h3>Create a New Account</h3>
                        </div>
                        <form onSubmit={onSubmit} className="login-form">
                            <div className="login-form-group">
                                <input
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder="Enter your Email-ID"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="login-input-field"
                                />
                            </div>
                            <div className="login-form-group">
                                <input
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    placeholder="Enter your Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="login-input-field"
                                    disabled={isRegistering}
                                />
                            </div>
                            <div className="login-form-group">
                                <input
                                    type="password"
                                    autoComplete="off"
                                    required
                                    placeholder="Confirm your Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="login-input-field"
                                    disabled={isRegistering}
                                />
                            </div>
                            {errorMessage && <span className="login-error-message">{errorMessage}</span>}
                            <button
                                type="submit"
                                disabled={isRegistering}
                                className={isRegistering ? 'login-signin-submit-btn login-disabled' : 'login-signin-submit-btn'}
                            >
                                {isRegistering ? 'Signing Up...' : 'Sign Up'}
                            </button>
                        </form>
                        <p className="login-signup-link">
                            Already have an account? <Link to="/login">Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;

