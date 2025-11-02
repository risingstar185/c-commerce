import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import  AuthProvider  from './context/AuthContext.jsx'; // ✅ Use Provider component
import { UserProvider } from './context/UserContext.jsx';   // ✅ Use Provider component
import ShopContext from './context/ShopContext.jsx';
import Nav from './components/Nav.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <UserProvider>
        <ShopContext>

       <Nav/>
        <App />
         </ShopContext>
      </UserProvider>
    </AuthProvider>
  </BrowserRouter>
);
