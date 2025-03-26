import axios from "axios";

const apiKey = '4aaa8a8ddb6bbb48bcda09adeedc1d44'; 

export const fetchMovies = async (url, topic, page) => {

    const response = await axios.get(url, {
      params: {
        api_key: apiKey,
        include_adult: false,
        language: 'en-US',
        page, 
        query: topic, 
      }
    });
    
    return response.data;
};

export const fetchMovieById = async (movieId) =>{
  const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
    params: {
      api_key: apiKey,
    }
  });
  
  return response.data;
};

export const fetchMovieReviews = async (movieId) =>{
  const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
    params: {
      api_key: apiKey,
    }
  });
  
  return response.data;
};

export const fetchMovieCasts = async (movieId) =>{
  const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
    params: {
      api_key: apiKey,
    }
  });
  
  return response.data;
};