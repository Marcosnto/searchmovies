import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import NotFoundImage from '../../assets/img_not_found.png'
import './movie-styles.scss';

const base_URL_img = 'https://image.tmdb.org/'

export default function Index({ moviesData, genres }) {
  console.log(moviesData);
  const [posterImg, setPosterImg] = useState(NotFoundImage);

  function getPorcentage(porcentage) {
    return Math.trunc(porcentage) + '%'
  }

  function getGenresNames(id){
    const currectGenres = genres.filter((genre) => genre.id === id);
    return currectGenres[0].name;
  }

  useEffect(() => {
    if(moviesData.poster_path){
      setPosterImg(`${base_URL_img}t/p/w500/${moviesData.poster_path}`);
    }
  }, [moviesData]);

  return (
    <div className="movie__card" min-width="300px">
      <img src={posterImg} alt="teste"/>
      <div className="movie_details">
        <Link to="/movie-detail">
          <div className="movie_details-title">
          <span className="score"><span>{getPorcentage(moviesData?.popularity)}</span></span>
          <h2>{moviesData?.title}</h2>
          </div>
        </Link>
        <ul className="movie_details-card" key={`cardList+${moviesData.id}`}>
          <li className="movie_details--score_date date" key={`date+${moviesData.id}`}>
            {moviesData?.release_date}
          </li>
          <li className="movie_details-description" key={`description+${moviesData.id}`}>
            <p className="movie_description-text">{moviesData?.overview}</p>
            <div className="movie_details-tags">
              {moviesData?.genre_ids?.map((id) => {
              return <span>{getGenresNames(id)}</span>
              })}
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
