

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from '../src/redux/store/store'
import { PersistGate } from 'redux-persist/integration/react';  
import { persistor } from './redux/store/store';  

ReactDOM.render(
  <Provider store={store}>  
    <PersistGate  persistor={persistor}>  
      <App/>  
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
