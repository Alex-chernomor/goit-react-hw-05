import axios from "axios";

export const apiKey = '4aaa8a8ddb6bbb48bcda09adeedc1d44'; 
export const baseUrl = 'https://api.themoviedb.org/3/movie/'

const params = {
  api_key: apiKey,
}


export const fetchMovies = async (url, topic, page) => {

  const response = await axios.get(url, {
    params: {
      api_key: apiKey,
      include_adult: false,
      language: 'en-US',
      page, 
      query:topic,
    }
  });
  
  return response.data;
};


export const fetchMovieById = async (movieId) =>{
  const response = await axios.get(`${baseUrl}${movieId}`,{
    params,
  }
);
  
  return response.data;
};

export const fetchMovieReviews = async (movieId) =>{
  const response = await axios.get(`${baseUrl}${movieId}/reviews`, {
    params,
  });
  
  return response.data;
};

export const fetchMovieCasts = async (movieId) =>{
  const response = await axios.get(`${baseUrl}${movieId}/credits`, {
    params,
  });
  
  return response.data;
};