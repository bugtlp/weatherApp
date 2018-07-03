/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render } from 'react-dom';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import CitiesStore from 'stores/CitiesStore';
import {
  geo,
} from 'services';
import MainPage from 'pages/MainPage';

useStrict(true);

const citiesStore = new CitiesStore(window.localStorage);
const services = {
  geo,
};

render(
  <Provider cities={citiesStore} services={services}>
    <div>
      <DevTools />
      <MainPage />
    </div>
  </Provider>,
  document.getElementById('root'),
);
