import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import CoreLayout from './common/layouts/CoreLayout';
import './styles/_main.scss';
import Config from './config';

ReactDOM.render(
  <React.StrictMode>
    <CoreLayout api={Config.api}>
      <Routes />
    </CoreLayout>
  </React.StrictMode>,
  document.getElementById('root')
);
