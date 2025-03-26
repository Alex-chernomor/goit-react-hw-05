import { useEffect, useState } from "react";
import { fetchMovieReviews } from "../MovieList";
import { useParams } from "react-router";
import css from './MovieReviews.module.css';
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function MovieReviews() {
  const {movieId} = useParams();
  const [reviews, setReveiws] = useState([]);
  const [error, setError] = useState(false)
  try {
    useEffect(()=>{
      async function getReviews() {
        setError(false);
        const data = await fetchMovieReviews(movieId);
        setReveiws(data.results);
      }
      getReviews();
    },[movieId]);
  } catch  {
    setError(true);
  }  
  
  return (
    <div>
        <ul>
        {reviews.length>0 && reviews.map((reveiw)=>{
          return <li key={reveiw.id}>
            <h2>Author: {reveiw.author}</h2>
            <p>{reveiw.content}</p>
          </li>
        })}
        </ul>
        {error && <ErrorMessage/>}
        {reviews.length === 0 && <p>We don't have any reviews for this movie</p>}
    </div>
  )
}
