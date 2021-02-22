import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

import Header from '../../components/Header';
import MovieDetails from '../../components/MovieDetails'

import './details-styles.scss';

import api from '../../api';
const key = '39f5cc0d37ae1fa0cb26c4fefc3801e6';

export default function Index() {

  const [movieData, setMovieData] = useState();
  const [videoKey, setVideo] = useState();
  const { params } = useRouteMatch();

  async function getData() {
    await api.get(`/movie/${params.id}?api_key=${key}&language=pt-BR`)
    .then(response => {
      setMovieData(response.data);
      console.log(response.data)
    })
    .catch(reject => {
      console.log('ocorreu um erro ', reject);
    });

    await api.get(`/movie/${params.id}/videos?api_key=${key}&language=pt-BR`)
    .then(response => {
      if(response.data.results.length !== 0){
        setVideo(response.data.results[0].key);
      }else {
        api.get(`/movie/${params.id}/videos?api_key=${key}`)
        .then(response => {
          setVideo(response.data.results[0].key);
        })
      }
    })
    .catch(reject => {
      console.log('ocorreu um erro ', reject);
    });
  }

  useEffect(() => {
    getData();
  }, [])
  
  if(!movieData){
    return (
      <h1>Carregando...</h1>
    )
  }

  if(movieData){
    return (
      <div>
          <Header />
          <MovieDetails movieData={movieData} videoKey={videoKey}/>
      </div>
    )
  }

}
