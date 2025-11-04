import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
    const {loginWithRedirect, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate('/dashboard');
    }, [isAuthenticated, navigate]);

    return (
        <div>
            <h1>Login</h1>
            <button onClick={() => loginWithRedirect()}>Login with Auth0</button>
        </div>
    );
}