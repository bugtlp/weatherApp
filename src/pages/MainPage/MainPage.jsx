import React, { Component } from 'react';
import {
  inject,
  observer,
  PropTypes as MobxPropTypes,
} from 'mobx-react';
import { reaction } from 'mobx';
import PropTypes from 'prop-types';

import CityList from 'components/CityList';
import WeatherWidget from 'components/WeatherWidget';

@inject('citiesStore', 'weatherStore', 'services')
@observer
export class MainPage extends Component {
  static propTypes = {
    citiesStore: PropTypes.shape({
      cityNames: MobxPropTypes.arrayOrObservableArrayOf(PropTypes.string),
      load: PropTypes.func,
      selectedCity: PropTypes.string,
    }).isRequired,
    weatherStore: PropTypes.shape({
      load: PropTypes.func,
    }).isRequired,
    services: PropTypes.shape({
      geo: PropTypes.shape({}),
      weather: PropTypes.shape({}),
    }).isRequired,
  }

  componentDidMount() {
    const {
      citiesStore,
      weatherStore,
      services: { geo: geoService },
    } = this.props;
    citiesStore.load();
    geoService.getCurrentPosition()
      .then((coords) => {
        weatherStore.load({
          lat: coords.latitude,
          lon: coords.longitude,
        });
      });
    this.weatherReaction = reaction(
      () => citiesStore.selectedCity,
      (cityName) => {
        weatherStore.load({ name: cityName });
      },
    );
  }

  componentWillUnmount() {
    if (typeof this.weatherReaction === 'function') {
      this.weatherReaction();
    }
  }

  render() {
    const { citiesStore, weatherStore } = this.props;
    return (
      <div>
        <CityList store={citiesStore} />
        <hr />
        <WeatherWidget
          store={weatherStore}
        />
      </div>
    );
  }
}

export default MainPage;
