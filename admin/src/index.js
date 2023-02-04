import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// context provider
import { AuthContextProvider } from './context/authContext/AuthContext';
import { UserContextProvider } from './context/userContext/UserContext';
import { MovieContextProvider } from './context/movieContext/MovieContext';
import { ListContextProvider } from './context/listContext/ListContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <AuthContextProvider>
      < UserContextProvider>
        <ListContextProvider>
          <MovieContextProvider>
            <App />
          </MovieContextProvider>
        </ListContextProvider>
      </ UserContextProvider>
    </AuthContextProvider>
  </div>
);

