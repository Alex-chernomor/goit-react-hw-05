import {apiKey} from './getMovieList';
import axios from 'axios';


export const fetchTrandingMovies = async (url) => {

    const response = await axios.get(url, {
      params: {
        api_key: apiKey,
      }
    });
    
    return response.data;
};