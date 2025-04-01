import css from './MovieInfo.module.css';
import AddBtn from '../Button/Button';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Suspense, useRef } from 'react';

export default function MovieInfo({movie}) {

    const location = useLocation();
    const backLinkRef = useRef(location.state ?? "/");
    
    return (
    <div>
       <Link to={backLinkRef.current}>
            <AddBtn className={css.goBackBtn} 
                    context={"Go back"}
                    />
       </Link>
        <div>
            <div className={css.poster}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt='poster' />
            </div>
            <h2>{movie.title} ({new Date(movie.release_date).getFullYear()})</h2>
            <h3>Overview</h3>
            <p>{movie.overview}</p>
            <h4>Genres</h4>
            <ul>
            {movie.genres.map((genre)=>{
                return <li key={genre.id}>
                           <p>{genre.name}</p>
                        </li>
                })}
            </ul>
        </div>
        <div>
            <p className={css.info}>Additional information</p>
            <ul>
                <li>
                    <NavLink to="casts">Cast</NavLink>
                </li>
                <li>
                    <NavLink to="reviews">Reviews</NavLink>
                </li>
            </ul>
            <Suspense fallback={<p>Loading content...</p>}>
                <Outlet/>
            </Suspense>
        </div>
    </div>
  )
}
