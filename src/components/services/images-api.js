async function fetchImages(nextName, nextPage) {
  const BASE_URL = 'https://pixabay.com/api';
  const API_KEY = '31897443-8d2d373622bb59a1b3cd97685';
  const url = `${BASE_URL}/?q=${nextName}&page=${nextPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  return await fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error('Щось пішло не так... Спробуйте перезавантажити сторінку.')
    );
  });
}

const api = {
  fetchImages,
};

export default api;

// =============================================
// import axios from 'axios';
// const axios = require('axios').default;
// try {
//   const response = await axios.get(url);
//   console.dir(response);
//   return response;
// } catch (error) {
//   console.log(er
