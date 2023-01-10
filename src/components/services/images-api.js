import axios from 'axios';

export const imagesApi = async (nextName, nextPage) => {
  const BASE_URL = 'https://pixabay.com/api';
  const API_KEY = '31897443-8d2d373622bb59a1b3cd97685';
  const url = `${BASE_URL}/?q=${nextName}&page=${nextPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  const data = await axios.get(url);
  console.log(data.data.hits);
  return data;
};
