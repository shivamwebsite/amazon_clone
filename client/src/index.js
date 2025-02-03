import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import store from './store';
// import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import ContextProvider from "./components/context/ContextProvider"
// import { CacheProvider } from '@emotion/react';

ReactDOM.render(
  <ContextProvider> 
     {/* <Provider store={store}> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  {/* </Provider> */}
  </ContextProvider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
