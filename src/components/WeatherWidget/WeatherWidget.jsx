import React, { Component } from 'react';
import {
  shape as shapeType,
  string as stringType,
  func as funcType,
} from 'prop-types';
import { observer } from 'mobx-react';
import css from './WeatherWidget.css';

const DESCRIPTION_TO_ICON = {
  Clear: 'clear-day',
  Sunny: 'sunny',
  'Moderate or heavy snow in area with thunder': 'snow',
  'Patchy light snow in area with thunder': 'snow',
  'Moderate or heavy snow showers': 'snow',
  'Light snow showers': 'snow',
  'Heavy snow': 'snow',
  'Patchy heavy snow': 'snow',
  'Moderate snow': 'snow',
  'Patchy moderate snow': 'snow',
  'Moderate or heavy rain in area with thunder': 'rain-thunder',
  'Patchy light rain in area with thunder': 'rain-thunder',
  'Heavy rain': 'rain',
  'Heavy rain at times': 'rain',
  'Moderate rain': 'rain',
  'Moderate rain at times': 'rain',
  'Light rain': 'rain',
  'Patchy light rain': 'rain',
  'Heavy freezing drizzle': 'drizzle',
  'Freezing drizzle': 'drizzle',
  'Light drizzle': 'drizzle',
  'Patchy light drizzle': 'drizzle',
  'Moderate or heavy showers of ice pellets': 'hail',
  'Light showers of ice pellets': 'hail',
  'Ice pellets': 'hail',
  Overcast: 'cloudy',
  Cloudy: 'cloudy',
  'Partly Cloudy': 'party-cloudy',
};

@observer
export class WeatherWidget extends Component {
  static propTypes = {
    store: shapeType({
      placeName: stringType,
      temperature: stringType,
      description: stringType,
      toggleMode: funcType,
    }).isRequired,
  }

  componentWillMount() {
    const { store } = this.props;
    this.store = store;
  }

  onTempClick = () => {
    this.store.toggleMode();
  }

  renderIconStyle() {
    const { data } = this.store;
    return DESCRIPTION_TO_ICON[data.get('weatherDesc')];
  }

  render() {
    const {
      placeName,
      temperature,
      description,
      pending,
      error,
    } = this.store;

    if (pending) {
      return (
        <div className={css.wrapper}>
          <div className={css.spinner}>
            Загрузка...
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className={css.wrapper}>
          <div className={css.spinner}>
            Ошибка!
          </div>
          <div />
          <div style={{ paddingTop: '30px' }}>
            <div className={`${css.icon} ${css.alert}`} />
          </div>
        </div>
      );
    }

    return (
      <div className={css.wrapper}>
        <div className={css.place}>
          {placeName || 'Мое местоположение'}
        </div>
        <div onClick={this.onTempClick} onKeyPress={this.onTempClick} style={{ paddingTop: '40px' }}>
          {temperature}
        </div>
        <div style={{ paddingTop: '30px' }}>
          <div className={`${css.icon} ${css[this.renderIconStyle()]}`} />
        </div>
        <div className={css.description}>
          {description}
        </div>
      </div>
    );
  }
}

export default WeatherWidget;
