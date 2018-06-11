import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import registerServiceWorker from './workers/registerServiceWorker';


ReactDOM.render(<App />, 
                document.getElementById('root'));

registerServiceWorker();
