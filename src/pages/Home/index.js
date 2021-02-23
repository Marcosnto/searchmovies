import React, { useState, useEffect} from 'react'

import SearchBar from '../../components/SearchBar'
import MovieCard from '../../components/MovieCard'
import Header from '../../components/Header'

import { api, key } from '../../api';

import './home-styles.scss'

export default function Index() {
  const [genres, setGenres] = useState();
  const [moviesData, setMoviesData] = useState();
  const [searchMovie, setSearchMovie] = useState();
  const [currectPage, setCurrectPage] = useState(1);
  
  const [selectedPage, setSelectedPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [dataPages, setDataPages] = useState([]);

  const moviesForPage = 5;

  function paginationData(fullData){
    let currectPosition = 5;
    let beforeValue = 0;
    let finalDataMovies = [];

    setTotalPages(Math.ceil(fullData.length / moviesForPage));

    if(fullData){
      for (let pagePosition = 0; pagePosition < totalPages; pagePosition++) {
        let temporayArray = [];
        for (let index = beforeValue; index < currectPosition; index++) {
          if(fullData[index]){
            temporayArray[index] = fullData[index];
          }
        }
        finalDataMovies[pagePosition] = temporayArray;
        beforeValue = currectPosition;
        currectPosition += 5;
      }
      setDataPages(finalDataMovies);
      setMoviesData(dataPages[selectedPage]);
    }
  }

  async function getData() {
    await api.get(`/search/movie?api_key=${key}&language=pt-BR&page=${currectPage}&query=${searchMovie}`)
      .then((response) => {
        paginationData(response.data.results);
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
    getGenres();
  }, [])

  useEffect(() => {
    setSelectedPage(0);
    getData();
  }, [searchMovie]);

  useEffect(() => {
    if(dataPages){
      setMoviesData(dataPages[selectedPage]);
    }
  }, [selectedPage]);

  function setNewPage(e){
    setSelectedPage(+e)
  }

  const pages = [];
  for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
    pages.push(
      <li key={pageNumber}>
        <button 
          className={(pageNumber === selectedPage) && 'selected-btn-page'} 
          onClick={() => setNewPage(pageNumber)}>
            {pageNumber}
        </button>
      </li>
    );
  }

  return (
    <>
      <Header />
        <section className="movie-section">
          <SearchBar onChange={setSearchMovie} value={searchMovie}/>
          {searchMovie ? moviesData?.map((movieData) => {
            if(movieData) {
              return <MovieCard moviesData={movieData} genres={genres}/>
            }
            return null;
          }) : <div className="movie-section__status">
                  <h1>Pesquise um filme!</h1>
               </div>
          }
          {searchMovie && (
            <ul className="pagination">{pages}</ul>
          )}
          {searchMovie && moviesData?.length === 0 && (
            <div className="movie-section__status">
              <h1>Nenhum resultado encontrado :(</h1>
            </div>
          )}
        </section>
    </>
    )
}
