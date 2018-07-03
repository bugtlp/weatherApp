import React, { Component } from 'react';
import {
  shape as shapeType,
  string as stringType,
  func as funcType,
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
      toggleMode: funcType,
    }).isRequired,
  }

  componentWillMount() {
    const { store } = this.props;
    this.store = store;
  }

  onDelete = () => {
    console.log('delete city');
  }

  onTempClick = () => {
    this.store.toggleMode();
  }

  render() {
    const {
      placeName,
      temperature,
      description,
    } = this.store;
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div className={css.wrapper}>
        <div>
          {placeName}
        </div>
        <div onClick={this.onTempClick} onKeyPress={this.onTempClick}>
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
