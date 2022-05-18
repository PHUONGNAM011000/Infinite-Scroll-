import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { transitions, positions, Provider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import 'video-react/dist/video-react.css';
import { BrowserRouter } from 'react-router-dom';

const options = {
  timeout: 3000,
  position: positions.TOP_CENTER,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider template={AlertTemplate} {...options}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
