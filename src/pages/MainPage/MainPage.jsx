import React, { Component } from 'react';

import TodoList from 'components/TodoList';

import WeatherForecastStore from 'stores/WeatherForecastStore';

export class MainPage extends Component {
  componentWillMount() {
    this.store = new WeatherForecastStore({ name: 'London' });
  }

  componentDidMount() {
    const { store } = this;
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