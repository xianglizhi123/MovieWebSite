import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './LoginForm'
import registerServiceWorker from './registerServiceWorker';
import MyRouter from "./Myrouter";

ReactDOM.render(<MyRouter/>, document.getElementById('root'));
registerServiceWorker();
