import React, { useEffect, useState } from 'react';

import Header from '../../components/Header';
import MovieDetails from '../../components/MovieDetails'

import './details-styles.scss';

import api from '../../api';

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

  if(!moviesData){
    return (
      <h1>Carregando...</h1>
    )
  }

  if(moviesData){
    return (
      <div>
          <Header />
          <MovieDetails moviesData={moviesData} />
      </div>
    )
  }

}
