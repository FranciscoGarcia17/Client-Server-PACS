import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import "./home.css";

export const Home = () => {
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:3001/movies");
        setMovies(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedMovies = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/movies/savedMovies/ids/${userID}`
        );
        setSavedMovies(response.data.savedMovies);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMovies();
    fetchSavedMovies();
  }, []);

  const saveRecipe = async (movieID) => {
    try {
      const response = await axios.put("http://localhost:3001/movies", {
        movieID,
        userID,
      });
      setSavedMovies(response.data.savedMovies);

      if (setSavedMovies(response.data.savedMovies).length < 0) {
        return `<h3>Aun no haz agregado Peliculas</h3>`;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const isMovieSaved = (id) => savedMovies.includes(id);

  return (
    <div>
      <h1 className="title-home">Peliculas Agregadas Reciente</h1>
      <ul className="lsita">
        <div className="container-movies">
          {movies.map((movie) => (
            <li key={movie._id}>
              <div className="card-movie">
                <div className="movies-header">
                  <h4>{movie.title}</h4>
                  <button
                    className="btn-save"
                    onClick={() => saveRecipe(movie._id)}
                    // disabled={isMovieSaved(movie._id)}
                  >
                    {isMovieSaved(movie._id) ? "Guardado" : "Guardar"}
                  </button>
                </div>
                <img src={movie.imageUrl} alt={movie.name} />
              </div>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};
