import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './Context/UserContext.jsx';
import { ApiProvider } from './Context/API_Context.jsx';
import { ToastProvider } from './Context/ToastContext.jsx';
// import { CartProvider } from './Context/AddToCart.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ApiProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </ApiProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>

)
