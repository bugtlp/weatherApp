import React, { Component } from 'react';
import {
  shape as shapeType,
  string as stringType,
} from 'prop-types';
import { observer } from 'mobx-react';
import css from './WeatherWidget.css';

@observer
export class WeatherWidget extends Component {
  static propTypes = {
    store: shapeType({
      placeName: stringType,
      temperature: stringType,
      description: stringType,
    }).isRequired,
  }

  onDelete = () => {
    console.log('delete city');
  }

  render() {
    const {
      store: {
        placeName,
        temperature,
        description,
      },
    } = this.props;

    return (
      <div className={css.wrapper}>
        <div>
          {placeName}
        </div>
        <div>
          {temperature}
        </div>
        <div>
          <div className={`${css.icon} ${css.sun}`} />
        </div>
        <div className={css.description}>
          {description}
        </div>
      </div>
    );
  }
}

export default WeatherWidget;
