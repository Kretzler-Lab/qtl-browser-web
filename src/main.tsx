import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route} from "react-router";
import { NavBar } from './components/Nav/Navbar.tsx';
import './index.css'
import 'bootstrap-5-css-only/css/bootstrap.min.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<App />} />
      </Routes>
    </BrowserRouter>
)
