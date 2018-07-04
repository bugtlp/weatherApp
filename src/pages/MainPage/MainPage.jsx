import React, { Component } from 'react';
import {
  inject,
  observer,
  PropTypes as MobxPropTypes,
} from 'mobx-react';
import { reaction, observable, action } from 'mobx';
import PropTypes from 'prop-types';

import CityList from 'components/CityList';
import WeatherWidget from 'components/WeatherWidget';

import css from './MainPage.css';

@inject('citiesStore', 'weatherStore', 'services')
@observer
export class MainPage extends Component {
  @observable myPlace = null;

  @observable pending = false;

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

  @action
  componentDidMount() {
    const {
      citiesStore,
      weatherStore,
      services: { geo: geoService },
    } = this.props;
    this.pending = true;
    citiesStore.load();
    geoService.getCurrentPosition()
      .then(action((coords) => {
        this.myPlace = {
          name: 'Мое местоположение',
          lat: coords.latitude,
          lon: coords.longitude,
        };
        return weatherStore.load(this.myPlace);
      }))
      .then(
        action(() => { this.pending = false; }),
        action(() => { this.pending = false; }),
      );
    this.weatherReaction = reaction(
      () => citiesStore.selectedCity,
      (cityName) => {
        let place = { name: cityName };
        if (!cityName && this.myPlace) {
          place = this.myPlace;
        }
        weatherStore.load(place);
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
    const { pending, myPlace } = this;
    if (pending) {
      return (
        <div className={css.spinner}>
          Загрузка...
        </div>
      );
    }

    return (
      <div>
        <CityList store={citiesStore} />
        <hr />
        {(myPlace || weatherStore.placeName)
          && (
            <WeatherWidget
              store={weatherStore}
            />
          )}
      </div>
    );
  }
}

export default MainPage;
