import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { TaskProvider } from './context/TaskProvider';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-28kvhm6gmvlck4xg.us.auth0.com"
      clientId="BHGc4LeiHj6FDmGUJ9tq9fkizJlRE4yJ"
      authorizationParams={{
        redirect_uri: `${window.location.origin}/callback`,
      }}
    >
      <BrowserRouter>
        <TaskProvider>
          <App />
        </TaskProvider>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);