import { Routes, Route } from 'react-router-dom';
import LoginPage from '../Pages/LoginPage';
import SearchPage from '../Pages/SearchPage';

/**
 * Create the routing of the page 
 */
function Router() {

  return (
    <Routes>
        <Route key={"default"} path={"/"} element={<LoginPage />} />
        <Route key={"search"} path={"search"} element={<SearchPage />} />
    </Routes>
  );
}

export default Router;