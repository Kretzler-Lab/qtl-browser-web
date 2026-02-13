import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route} from "react-router";
import { NavBar } from './components/Nav/Navbar.tsx';
import { VariantEffectsView } from './components/QTL/VariantEffectsView.tsx'
import './index.css'
import 'bootstrap-5-css-only/css/bootstrap.min.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='effects' element={<VariantEffectsView variant_id={"chr22-42091896-G-A"} ensg_id={"ENSG00000183172"}/>} />
      </Routes>
    </BrowserRouter>
)
