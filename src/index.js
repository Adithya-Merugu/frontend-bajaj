import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Correct path with relative import
import './index.css'; 

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
