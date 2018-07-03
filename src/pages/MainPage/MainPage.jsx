import React, { Component } from 'react';
import {
  inject,
  observer,
  PropTypes as MobxPropTypes,
} from 'mobx-react';
import PropTypes from 'prop-types';

import CityList from 'components/CityList';
import WeatherWidget from 'components/WeatherWidget';

import WeatherForecastStore from 'stores/WeatherForecastStore';
import service from 'services/weatherService';

@inject('cities')
@observer
export class MainPage extends Component {
  static propTypes = {
    cities: PropTypes.shape({
      cityNames: MobxPropTypes.arrayOrObservableArrayOf(PropTypes.string),
    }).isRequired,
  }

  componentWillMount() {
    this.weatherStore = new WeatherForecastStore({ name: 'London' }, {
      fetch: service.getForecast,
    });
  }

  componentDidMount() {
    const { cities } = this.props;
    cities.load();
  }

  render() {
    const { cities } = this.props;
    return (
      <div>
        <CityList store={cities} />
        <hr />
        <WeatherWidget
          store={this.weatherStore}
        />
      </div>
    );
  }
}

export default MainPage;
