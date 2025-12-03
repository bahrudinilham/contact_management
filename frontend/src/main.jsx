import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './styles/reset.css';
import './styles/index.css';
import App from './App.jsx';
import AlertProvider from './components/ui/alertProvide/AlertProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AlertProvider>
      <App />
    </AlertProvider>
  </StrictMode>
);
