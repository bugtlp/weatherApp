
const service = {
  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve(position.coords);
        });
      } else {
        reject(new Error('No position available'));
      }
    });
  },
};

export default service;
