import { Link } from 'react-router-dom'
import css from './Movies.module.css'

export default function MoviesList({movies}) {
  return (
    <div>
           <ul className={css.imageList}>
              {movies.map((movie)=>(
                <li className={css.moviesEl} key = {movie.id}>
                        <Link to={`/movies/${movie.id}`}>
                        <div className={css.movieCard}>
                        <div className={css.posterContainer}>
                              <img className={css.poster} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="poster" />
                            </div>
                            {movie.title}
                        </div>
                      </Link>
            </li>
               ))}
           </ul>
    </div>
  )
}