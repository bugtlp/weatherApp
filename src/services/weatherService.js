/* global fetch WEATHER_API_KEY */
class Service {
  apiUrl = 'http://api.worldweatheronline.com/premium/v1/weather.ashx';

  lang = 'ru';

  getForecast = ({ name, lat, lon }) => {
    const q = name || `${lat},${lon}`;
    const params = new URLSearchParams();
    params.set('q', q);
    params.set('key', WEATHER_API_KEY);
    params.set('format', 'json');
    params.set('lang', this.lang);
    params.set('num_of_days', 1);

    return fetch(`${this.apiUrl}?${params.toString()}`)
      .then(response => response.json())
      .then(({ data: { current_condition: conditions } }) => {
        const condition = conditions && conditions[0];
        const weatherDesc = condition.weatherDesc
          && condition.weatherDesc[0]
          && condition.weatherDesc[0].value;
        const weatherDescLang = condition[`lang_${this.lang}`]
          && condition[`lang_${this.lang}`][0]
          && condition[`lang_${this.lang}`][0].value;
        return {
          temp_C: condition.temp_C,
          temp_F: condition.temp_F,
          weatherDesc,
          weatherDescLang,
        };
      });
  }
}

export default new Service();
