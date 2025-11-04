import { useAuth0 } from '@auth0/auth0-react';

export function useAuth() {
    const { loginWithRedirect, logout, isAuthenticated, user, getAccessTokenSilently } = useAuth0();
    // Define an interface for the fields you expect from 'user'
    //e.g. interface Auth0User { sub: string; email?: string; name?: string; }
    return { loginWithRedirect, logout, isAuthenticated, user, getAccessTokenSilently };
}