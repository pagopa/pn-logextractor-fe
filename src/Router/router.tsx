import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../Pages/LoginPage';
import SearchPage from '../Pages/SearchPage';
import PrivateRoute from "./PrivateRoute"

/**
 * Create the routing of the page 
 */
function Router() {
  const [email, setEmail] = useState("test@test.com");

  return (
    <Routes>
        <Route key={"default"} path={"/"} element={<LoginPage setEmail={setEmail}/>} />
        <Route path="*" element={<Navigate replace to="/search" />} />
        <Route path="/search" element={<PrivateRoute condition="token"><SearchPage email={email}/></PrivateRoute>}/>
    </Routes>
  );
}

export default Router;