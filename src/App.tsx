import { BrowserRouter } from 'react-router-dom';
import './App.css';
import SnackbarComponent from './Components/SnackbarComponent';
import Page from './Pages/SearchPage'
import Router from './Router/router';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Router />
        <SnackbarComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
