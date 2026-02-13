import { createRoot } from 'react-dom/client'
import { Routes, Route, BrowserRouter} from "react-router";
import { NavBar } from './components/Nav/Navbar.tsx';
import { VariantEffectsView } from './components/QTL/VariantEffectsView.tsx'
import './index.css'
import 'bootstrap-5-css-only/css/bootstrap.min.css';
import App from './App.tsx';
import { store } from './app/store.ts';
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<App />}/>
        <Route path='effects' element={<VariantEffectsView variant_id={"chr1-96150-G-A"}/>}/>
      </Routes>
    </BrowserRouter>
  </Provider >
)
