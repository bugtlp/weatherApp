import React from 'react';
import { render } from 'react-dom';
import { useStrict } from 'mobx';
import DevTools from 'mobx-react-devtools';

import MainPage from 'pages/MainPage';

useStrict(true);

render(
  <div>
    <DevTools />
    <MainPage />
  </div>,
  document.getElementById('root'),
);
