import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorkerRegistration from './service-worker/service-worker-registration';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();
