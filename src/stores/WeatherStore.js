import { observable, action, computed } from 'mobx';

export default class WeatherForecastStore {
  @observable place = {
    name: '',
    lat: null,
    lon: null,
  };

  @observable mode = 'C';

  @observable data = observable.map([
    ['temp_C', '0'],
    ['temp_F', '0'],
    ['weatherDesc', ''],
    ['weatherDescLang', ''],
  ]);

  @observable pending = false;

  @observable error = null;

  @computed
  get placeName() {
    return this.place.name;
  }

  @computed
  get temperature() {
    const value = this.data.get(`temp_${this.mode}`);
    const prefix = +value > 0 ? '+' : '-';
    return `${prefix}${value} ${this.mode}`;
  }

  @computed
  get description() {
    return this.data.get('weatherDescLang')
      || this.data.get('weatherDesc');
  }

  constructor(weatherApi) {
    this.weatherApi = weatherApi;
  }

  /**
   * Loading weather by city name or coordinates
   * @param {object} place
   * @param {number} place.lat
   * @param {number} place.lon
   * @param {string} place.name
   * @returns {Promise}
   */
  @action
  load(place) {
    this.setPlace(place);
    this.error = null;
    this.pending = true;
    return this.weatherApi.fetch(place) // { name, lat, lon }
      .then(action((data) => {
        this.data.replace(data);
        this.pending = false;
      }), action((error) => {
        this.error = error;
        this.pending = false;
      }));
  }

  @action
  toggleMode() {
    this.mode = this.mode === 'C' ? 'F' : 'C';
  }

  /**
   * Setting place without loading data
   * @param {object} place
   * @param {number} place.lat
   * @param {number} place.lon
   * @param {string} place.name
   * @returns {void}
   */
  @action
  setPlace(place) {
    Object.assign(this.place, {
      name: '',
      lat: null,
      lon: null,
    });
    Object.assign(this.place, place);
  }
}
