import React, { Component } from 'react';
import {
  shape as shapeType,
  string as stringType,
  func as funcType,
} from 'prop-types';
import { observable, action } from 'mobx';
import { observer, PropTypes as MobxPropTypes } from 'mobx-react';

import css from './CityList.css';

@observer
class CityList extends Component {
  @observable cityName = '';

  static propTypes = {
    store: shapeType({
      cityNames: MobxPropTypes.arrayOrObservableArrayOf(stringType),
      addCity: funcType,
      removeCity: funcType,
    }).isRequired,
  }

  componentWillMount() {
    const { store } = this.props;
    this.store = store;
  }

  @action
  onInputChange = (e) => {
    this.cityName = e.target.value;
  };

  @action
  onSubmit = (e) => {
    e.preventDefault();
    if (this.cityName) {
      this.store.addCity(this.cityName);
    }
    this.cityName = '';
  };

  onDelete = (e) => {
    e.preventDefault();
    const cityName = e.target.parentNode.getAttribute('data-name');
    this.store.removeCity(cityName);
  }

  onSelect = (e) => {
    const cityName = e.target.parentNode.getAttribute('data-name');
    this.store.setSelected(cityName);
  }

  render() {
    const { onDelete, onSelect } = this;
    const { cityNames, selectedCity } = this.store;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          Новый город:
          <input
            type="text"
            value={this.cityName}
            onChange={this.onInputChange}
          />
          <button type="submit" disabled={this.cityName === ''}>
            Добавить
          </button>
        </form>
        <div className={css.cityList}>
          {cityNames.map(city => (
            <div
              key={city}
              data-name={city}
              className={city === selectedCity && css.selected}
            >
              <span onClick={onSelect}>
                {city}
              </span>
              <button type="button" onClick={onDelete}>
                x
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default CityList;
