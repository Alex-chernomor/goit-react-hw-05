import SearchBar from "../../components/SearchBar/SearchBar";
import Loader from "../../components/Loader/Loader";
import toast, {Toaster} from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { fetchMovies } from '../../components/getMovieList';
import { useSearchParams } from "react-router-dom";
import ErrorMessage  from '../../components/ErrorMessage/ErrorMessage';
import MovieList from "../../components/MovieList/MovieList";
import AddBtn from "../../components/Button/Button";

const url = 'https://api.themoviedb.org/3/search/movie';

export default function MoviesPage() {
  
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [noMovie, setNoMovie] = useState(false);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  const [searchParams, setSearchParams]= useSearchParams();
  
  const query = searchParams.get('query') ?? '';
  const [searchMovie, setSearchMovie] = useState(query);
  
  const changeSearchText = (e) => {
    const nextParams = new URLSearchParams(searchParams);
    if (e.target.value !== '') {
      nextParams.set('query', e.target.value);
    } else {
      nextParams.delete('query');
    }
    setSearchParams(nextParams);
    setInput(nextParams.get('query') ?? '');
  };

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
          setNoMovie(true);
        }   
        setMovies(() =>{
            return [...data.results];
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
  
  const handleSearch = async ()=>{    
    if(query===''){
        notify();
    }
    setSearchMovie(query);    
    setPage(1);
    setMovies([]);
    setNoMovie(false);
    setInput('');
  }; 

  return (
    <div>
      <SearchBar onSearch={handleSearch} value={input} onChange = {changeSearchText}/>
      {error && <ErrorMessage />}
      {movies.length>0 && <MovieList movies={movies}/>}
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