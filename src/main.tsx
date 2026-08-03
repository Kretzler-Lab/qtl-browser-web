import { createRoot } from 'react-dom/client'
import { Routes, Route, BrowserRouter, useLocation} from "react-router";
import { NavBar } from './components/Nav/Navbar.tsx';
import { VariantEffectsView } from './components/QTL/VariantEffectsView.tsx'
import './index.css'
import 'bootstrap-5-css-only/css/bootstrap.min.css';
import App from './App.tsx';
import { store } from './app/store.ts';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './app/store.ts';
import { About } from './components/About/About.tsx';
import { Footer } from './components/Nav/Footer.tsx';
import ReactGA4 from "react-ga4";
import { useEffect } from 'react';
store.subscribe(function () {
  console.log(store.getState());
})
const GA_TRACKING_ID = 'G-N59NV2CP01';
ReactGA4.initialize(GA_TRACKING_ID);

const logPageView = (path: string): void => {
  ReactGA4.set({ page: path });
  ReactGA4.send({ hitType: 'pageview', page: path });
};

export function GAListener(): null {
  const location = useLocation();

  useEffect(() => {
    logPageView(location.pathname + location.search);
  }, [location.pathname, location.search]);

  return null;
}

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor} >
      <BrowserRouter>
        <GAListener /> 
            <div id='app'>
              <NavBar />
              <Routes>
                <Route path='/' element={<App />} />
                <Route path='effects' element={<VariantEffectsView />} />
                <Route path='about' element={<About />} />
              </Routes>
            </div>
            <div className='footer'>
              <Footer />
            </div>
        </BrowserRouter>
    </PersistGate>
  </Provider >
)
