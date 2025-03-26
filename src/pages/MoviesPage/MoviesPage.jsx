import SearchBar from "../../components/SearchBar/SearchBar";
import Loader from "../../components/Loader/Loader";
import toast, {Toaster} from 'react-hot-toast';
import css from './MoviesPage.module.css';
import { useState, useEffect } from 'react';
import ErrorMessage  from '../../components/ErrorMessage/ErrorMessage';

import {fetchMovies} from '../../components/MovieList';
import MoviesList from "../../components/MoviesList/MoviesList";
import AddBtn from "../../components/Button/Button";

const url = 'https://api.themoviedb.org/3/search/movie';


export default function MoviesPage() {

  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [noMovie, setNoMovie] = useState(false);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const notify = () => toast('Whrite something into the input',  {
    style: {
      border: '1px solid red',
      color: "red",
      fontWeight: "bold",
      backgroundColor: "black"
    },
  });


  useEffect(()=>{
    if(searchMovie === ''){
      return
    }
    async function getData() {
      try {
        setError(false);
        setIsLoading(true);
        const data = await fetchMovies(url, searchMovie, page); 
  
        setMaxPage(data.total_pages);
        if (data.total_results === 0) {
          setNoMovie(true)
        }   
        setMovies(prevMovies =>{
          return [...prevMovies, ...data.results]
       })
      } catch {
          setError(true);
      }
       finally {
          setIsLoading(false);
      }
    }
    getData();
  },[page, searchMovie]);
  

  const handleClickLoadMoreBtn = () => {
    setPage(page + 1);
  }

  const handleSearch = async (topic)=>{    
    if(topic===''){
        notify()
    }
    setSearchMovie(topic);    
    setPage(1);
    setMovies([]);
    setNoMovie(false);
  }; 

  return (
    <div>
      <SearchBar onSearch={handleSearch}/>
      {error && <ErrorMessage />}
      {movies.length>0 && <MoviesList movies={movies}/>}
      {movies.length>0 && page !== maxPage && <AddBtn onClick={handleClickLoadMoreBtn} context={"Load more"}/>}
      {isLoading && <Loader />}
      {noMovie && <ErrorMessage/>}
    
      <Toaster 
       toastOptions={{
         duration: 1500,
         removeDelay: 300,
        }
        }/>
    </div>
  )
}
