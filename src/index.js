import React from 'react';
import { render } from 'react-dom';
import DevTools from 'mobx-react-devtools';

import MainPage from 'pages/MainPage';

render(
  <div>
    <DevTools />
    <MainPage />
  </div>,
  document.getElementById('root'),
);
