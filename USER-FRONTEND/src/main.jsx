import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = "your_client_id"; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
    {/* <AuthProvider> */}
    <App />
    {/* </AuthProvider> */}
    </GoogleOAuthProvider>
   
  </StrictMode>
  
)
