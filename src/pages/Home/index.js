import React, { useState, useEffect} from 'react'
import SearchBar from '../../components/SearchBar'
import MovieCard from '../../components/MovieCard'
import Header from '../../components/Header'

import api from '../../api';
import './home-styles.scss'

const key = '39f5cc0d37ae1fa0cb26c4fefc3801e6';

export default function Index() {
  const [genres, setGenres] = useState();
  const [moviesData, setMoviesData] = useState();
  const [currectPage, setCurrectPage] = useState(1);
  const [searchMovie, setSearchMovie] = useState();

  async function getData() {
    await api.get(`/search/movie?api_key=${key}&language=pt-BR&page=${currectPage}&query=${searchMovie}`)
    .then((response) => {
      setMoviesData(response.data.results);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  async function getGenres() {
    await api.get(`genre/movie/list?api_key=${key}&language=pt-BR`)
    .then((response) => {
      setGenres(response.data.genres);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    getData();
    getGenres();
  }, [])

  useEffect(() => {
    getData();
  }, [searchMovie])

  if(!moviesData){
    return <h1>Carregando...</h1>
  }

  return (
    <>
      <Header />
        <section className="movie-section">
          <SearchBar onChange={setSearchMovie} value={searchMovie}/>
          {
          searchMovie ? moviesData?.map((movieData, index) => {
            if(true) {
              return <MovieCard moviesData={movieData} genres={genres}/>
            }
            return null;
          }) : <h1>Pesquise um filme gatinho</h1>
          }
        </section>
    </>
    )
}
