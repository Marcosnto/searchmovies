import React, { useEffect, useState } from 'react';

import NotFoundImage from '../../assets/img_not_found.png'

import './description-styles.scss';

const base_URL_img = 'https://image.tmdb.org/'

export default function Index({movieData, videoKey}) {
  const [posterImg, setPosterImg] = useState(NotFoundImage);
  const [overview, setOverview] = useState('Não há descrição para este filme.');

  useEffect(() => {
    if(movieData.poster_path){
      setPosterImg(`${base_URL_img}t/p/w500/${movieData.poster_path}`);
    }

    if(movieData.overview){
      setOverview(movieData.overview);
    }
  }, [movieData]);

  function getPorcentage(porcentage) {
    return Math.trunc(porcentage) + '%'
  }

  if(movieData){
    return (
      <div className="movie__details">
        <div className="description__title">
          <h1>{movieData.title}</h1>
          <time dateTime={movieData.release_date}>
              {movieData.release_date.split('-').reverse().join('/')}
          </time>
        </div>
  
        <div className="movie__details-description">
          <img src={posterImg} alt="teste"/>
          <ul className="movie__details-text">
            <li className="description__sinopse">
            <h2>Sinopse</h2>
            <hr/>
            <p>{overview}</p>
          </li>
            <li className="description__info">
            <h2>Informações</h2>
            <hr/>
            <ul className="description__info-data">
              <li>
                <h6>Situação</h6>
                <p>{movieData?.status}</p>
              </li>
              <li>
                <h6>Idioma</h6>
                <p>{movieData?.spoken_languages[0].name}</p>
              </li>
              <li>
                <h6>Duração</h6>
                <p>{movieData?.runtime}</p>
              </li>
              <li>
                <h6>Orçamento</h6>
                <p>${movieData?.budget}</p>
              </li>
              <li>
                <h6>Receita</h6>
                <p>${movieData?.revenue}</p>
              </li>
              <li>
                <h6>Lucro</h6>
                <p>${movieData?.budget}</p>
              </li>
            </ul>
          </li>
          <li className="movie_details-rate">
              <ul className="movie_details-tags">
                {movieData?.genres?.map((tag) => {
                  return <li>{tag.name}</li>
                })}
              </ul>
              <div className="movie_details-percentage">
                <span className="score"><span>{getPorcentage(movieData?.popularity)}</span></span>
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
}
