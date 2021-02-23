import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

import Header from '../../components/Header';
import MovieDetails from '../../components/MovieDetails'

import { api, key } from '../../api';

import './details-styles.scss';


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
          setVideo(response.data.results[0]?.key);
        })
      }
    })
    .catch(reject => {
      console.log('Ocorreu um erro ', reject);
    });
  }

  useEffect(() => {
    getData();
  }, [])

  return (
      <div>
        <Header />
        {movieData ? 
          <MovieDetails movieData={movieData} videoKey={videoKey}/>
        : <div className="movie-section__status">
              <h1>Carregando...</h1>
          </div>
         }
    </div>
  )
}
