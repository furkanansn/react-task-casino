import React, { useContext } from 'react';

import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';
import Slot from './components/Slot/Slot';
import { useRoutes } from 'react-router-dom';
function App() {
  const ctx = useContext(AuthContext);
  const routes = useRoutes([       
    { path: '/login', element: !ctx.isLoggedIn && <Login /> },
    { path: '/register', element: !ctx.isLoggedIn &&<Register /> },
    { path: '/', element:ctx.isLoggedIn ? <Home /> : <Login />},
    { path: '/home', element:ctx.isLoggedIn ? <Home /> : <Login />},
    { path: '/slot', element:ctx.isLoggedIn ? <Slot /> : <Login />},    
    { path: '*', element: <Login /> },     
]);
  return (
    <React.Fragment>
      <MainHeader />      
      <main>
       {routes}        
       </main>
    </React.Fragment>
  );
}

export default App;