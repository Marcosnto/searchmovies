import React, { useState, useEffect} from 'react'
import SearchBar from '../../components/SearchBar'
import MovieCard from '../../components/MovieCard'
import Header from '../../components/Header'

import api from '../../api';

import './home-styles.scss'

export default function Index() {
  const [moviesData, setMoviesData] = useState();

  async function getData() {
    await api.get('76341?api_key=39f5cc0d37ae1fa0cb26c4fefc3801e6&&language=pt-BR').then((response) => {
      console.log(response.data);
      setMoviesData(response.data);
    }
    );
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <>
      <Header />
      <section className="movie-section">
        <SearchBar />
        <MovieCard moviesData={moviesData}/>
      </section>
    </>
  )
}
