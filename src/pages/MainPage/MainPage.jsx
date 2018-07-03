import React, { Component } from 'react';

import TodoList from 'components/TodoList';

import WeatherForecastStore from 'stores/WeatherForecastStore';
import service from 'services/weatherService';

export class MainPage extends Component {
  componentWillMount() {
    this.store = new WeatherForecastStore({ name: 'London' }, {
      fetch: service.getForecast,
    });
  }

  componentDidMount() {
    const { store } = this;
    store.load();
    // TODO: код инициализации городов по умолчанию
  }

  render() {
    const { store } = this;
    return (
      <div>
        <TodoList store={store} />
      </div>
    );
  }
}

export default MainPage;