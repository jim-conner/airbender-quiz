import axios from 'axios';

const baseURL = 'https://api.sampleapis.com/avatar/questions';

const getQuestions = () => new Promise((resolve, reject) => {
  axios.get(baseURL)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export default getQuestions;
