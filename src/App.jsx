import { lazy, Suspense } from 'react';
import Navigation from './components/Navigation/Navigation';
import { Route, Routes } from 'react-router-dom';

import './App.css'

const HomePage = lazy(()=>import('./pages/HomePage/HomePage'));
const MoviesPage = lazy(()=>import('./pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(()=>import('./pages/MovieDetailsPage/MovieDetailsPage'));
const NotFoundPage = lazy(()=>import('./pages/NotFoundPage/NotFoundPage'));
const MovieCast = lazy(()=>import('./components/MovieCast/MovieCast'));
const MovieReviews = lazy(()=>import('./components/MovieReviews/MovieReviews'));

function App() {
  return (
    <>
      <Navigation />

      <Suspense fallback={<p>Loading page...</p>}>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/movies' element={<MoviesPage/>}/>
          <Route path='/movies/:movieId' element={<MovieDetailsPage/>}>
            <Route path='casts' element={<MovieCast/>}/>
            <Route path='reviews' element={<MovieReviews/>}/>
          </Route>
          <Route path='*' element={<NotFoundPage/>}/>
        </Routes>    
      </Suspense> 
    </>
  )
}

export default App
