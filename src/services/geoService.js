/* global navigator */
const service = {
  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve(position.coords);
        }, error => reject(error));
      } else {
        reject(new Error('No position available'));
      }
    });
  },
};

export default service;
