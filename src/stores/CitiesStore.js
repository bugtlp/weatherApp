import { observable, action } from 'mobx';

export default class CitiesStore {
  @observable cityNames = [];

  @observable selectedCity = '';

  constructor(storage, key = 'cities') {
    this.key = key;
    this.storage = storage;
  }

  @action
  addCity(cityName) {
    if (this.cityNames.indexOf(cityName) === -1) {
      this.cityNames.push(cityName);
    }
    this.setSelected(cityName);
    this.save();
  }

  @action
  removeCity(cityName) {
    const index = this.cityNames.indexOf(cityName);
    if (index !== -1) {
      this.cityNames.splice(index, 1);
    }
    this.save();
  }

  @action
  setSelected(cityName) {
    this.selectedCity = cityName;
  }

  @action
  load() {
    const data = this.storage[this.key];
    if (data) {
      this.cityNames = JSON.parse(data);
    }
  }

  @action
  save() {
    this.storage[this.key] = JSON.stringify(this.cityNames);
  }
}
