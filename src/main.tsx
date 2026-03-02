import { createRoot } from 'react-dom/client'
import { Routes, Route, BrowserRouter} from "react-router";
import { NavBar } from './components/Nav/Navbar.tsx';
import { VariantEffectsView } from './components/QTL/VariantEffectsView.tsx'
import './index.css'
import 'bootstrap-5-css-only/css/bootstrap.min.css';
import App from './App.tsx';
import { store } from './app/store.ts';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './app/store.ts';
store.subscribe(function () {
  console.log(store.getState());
})

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor} >
      <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path='/' element={<App />} />
              <Route path='effects' element={<VariantEffectsView />} />
            </Routes>
        </BrowserRouter>
    </PersistGate>
  </Provider >
)
