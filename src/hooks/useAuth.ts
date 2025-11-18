import { useAuth0 } from '@auth0/auth0-react';

export function useAuth() {
    const { loginWithRedirect, logout, isAuthenticated, user, getAccessTokenSilently } = useAuth0();

    return { loginWithRedirect, logout, isAuthenticated, user, getAccessTokenSilently };
}