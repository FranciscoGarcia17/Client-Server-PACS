import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import { MoviesRouter } from "./routes/movies.js";
import { MovieModel } from "./Models/Movie.model.js";
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

//Routing
app.use("/auth", userRouter);
app.use("/movies", MoviesRouter);


// app.get('/details/:movie_id', (req, res) => {
//     const { movie_id } = req.params

//     MoviesRouter
//     .findById(movie_id)
//     .then(movie => res.json(movie))
// });

// app.get("/moviesall", (req, res) => {
//     MovieModel
//     .find().then(allMovies => res.json(allMovies))
// });

//DB Connection
mongoose.connect('mongodb://localhost/movie-Bank', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Conectado a DB"));

app.listen(PORT, () => console.log(`Servidor Listen in port ${PORT}`));



