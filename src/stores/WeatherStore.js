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
    ['weatherDescr', ''],
  ]);

  @observable pending = false;

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
    return this.data.get('weatherDescr');
  }

  constructor(weatherApi) {
    this.weatherApi = weatherApi;
  }

  @action
  load(place) {
    this.pending = true;
    return this.weatherApi.fetch(place) // { name, lat, lon }
      .then(action((data) => {
        this.data.replace(data);
        this.pending = false;
      }));
  }

  @action
  toggleMode() {
    this.mode = this.mode === 'C' ? 'F' : 'C';
  }
}
