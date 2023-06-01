import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const SavedMovies = () => {
  const [savedMovies, setSavedMovies] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedMovies = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/movies/savedMovies/${userID}`
        );
        setSavedMovies(response.data.savedMovies);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedMovies();
  }, []);
  return (
    <div className="container-saved-movies">
      <h1 className="title-saved">Favoritas</h1>
      <ul>
        {savedMovies.map((movie) => (
          <li key={movie._id}>
            <div className="movies-container">
              <div className="container-image">
                <img className="image-favorite" src={movie.imageUrl} alt={movie.title} />
              </div>
              <div className="container-description-saved">
                <h2 style={{textAlign: "center"}}>{movie.title}</h2>
                <p style={{fontSize: "15px"}}><span style={{fontWeight: "bold",fontSize: "20px"}}>Descripcion: </span>{movie.description}</p>
                <p style={{fontSize: "15px"}}><span style={{fontWeight: "bold", fontSize: "20px"}}>Categorias: </span>{movie.category}</p>
                <p style={{fontSize: "15px"}}><span style={{fontWeight: "bold", fontSize: "20px"}}>Año Lanzamiento: </span>{movie.año}</p>
                <p className="reparto" style={{fontSize: "15px"}}><span style={{fontWeight: "bold", fontSize: "20px"}}>Reparto: </span><li>{movie.reparto}</li></p>
                <span>Disfrutala en: </span><img className="img-provider" src={movie.provider}/>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
