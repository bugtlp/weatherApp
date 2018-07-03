import React, { Component } from 'react';
import {
  inject,
  observer,
  PropTypes as MobxPropTypes,
} from 'mobx-react';
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
    }).isRequired,
    weatherStore: PropTypes.shape({
      load: PropTypes.func,
    }).isRequired,
    services: PropTypes.shape({
      geo: PropTypes.shape({}),
      weather: PropTypes.shape({}),
    }).isRequired,
  }

  componentWillMount() {
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
