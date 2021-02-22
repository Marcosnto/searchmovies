import React, { useEffect, useState } from 'react';

import api from '../../api';

import './description-styles.scss';


const base_URL_img = 'https://image.tmdb.org/'

export default function Index({ moviesData }) {

  const [videoKey, setVideo] = useState();

  useEffect(() => {
    api.get('76341/videos?api_key=39f5cc0d37ae1fa0cb26c4fefc3801e6')
    .then(response => {
      setVideo(response.data.results[0].key);
      console.log(response.data)
    })
    .catch(reject => {
      console.log('ocorreu um erro ', reject);
    });
  }, [])
  
  function getPorcentage(porcentage) {
    return Math.trunc(porcentage) + '%'
  }

  return (
    <div className="movie__details" width="560px">
      <div className="description__title">
        <h1>{moviesData.title}</h1>
        <time dateTime={moviesData.release_date}>
            {moviesData.release_date}
        </time>
      </div>

      <div className="movie__details-description">
        <img src={`${base_URL_img}t/p/w500/${moviesData?.poster_path}`} alt="teste"/>
        <ul className="movie__details-text">
          <li className="description__sinopse">
          <h2>Sinopse</h2>
          <hr/>
          <p>{moviesData.overview}</p>
        </li>
          <li className="description__info">
          <h2>Informações</h2>
          <hr/>
          <ul className="description__info-data">
            <li>
              <h6>Situação</h6>
              <p>{moviesData.status}</p>
            </li>
            <li>
              <h6>Idioma</h6>
              <p>{moviesData.spoken_languages[0].name}</p>
            </li>
            <li>
              <h6>Duração</h6>
              <p>{moviesData.runtime}</p>
            </li>
            <li>
              <h6>Orçamento</h6>
              <p>${moviesData.budget}</p>
            </li>
            <li>
              <h6>Receita</h6>
              <p>${moviesData.revenue}</p>
            </li>
            <li>
              <h6>Lucro</h6>
              <p>${moviesData?.budget}</p>
            </li>
          </ul>
        </li>
        <li className="movie_details-rate">
            <ul className="movie_details-tags">
              {moviesData?.genres?.map((tag) => {
                return <li>{tag.name}</li>
              })}
            </ul>
            <div className="movie_details-percentage">
              <span className="score"><span>{getPorcentage(moviesData?.popularity)}</span></span>
            </div>
        </li>
        </ul>
      </div>
      <div className="movie__video">
        <iframe title="Trailer do filme" id="ytplayer" type="text/html"
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=0&origin=http://example.com`}
        frameBorder="0"/>
      </div>
    </div>
  )
}
