import express from "express";
import mongoose from "mongoose";
import { MovieModel } from "../Models/Movie.model.js";
import { UserModel } from "../Models/Users.model.js";
import { verifyToken } from "./user.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await MovieModel.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new Movie
router.post("/", verifyToken, async (req, res) => {
  const movie = new MovieModel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
    año: req.body.año,
    reparto: req.body.reparto,
    imageUrl: req.body.imageUrl,
    category: req.body.category,
    video: req.body.video,
    userOwner: req.body.userOwner,
  });
  console.log(movie);

  try {
    const result = await movie.save();
    res.status(201).json({
      createdMovie: {
        name: result.name,
        imageUrl: result.imageUrl,
        description: result.description,
        año: result.año,
        reparto: result.reparto,
        category: result.category,
        video: result.video,
        _id: result._id,
      },
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json(err);
  }
});

// Get a movie by ID
router.get("/:movieId", async (req, res) => {
  try {
    const result = await MovieModel.findById(req.params.movieId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Save a Recipe
router.put("/", async (req, res) => {
  const movie = await MovieModel.findById(req.body.movieID);
  const user = await UserModel.findById(req.body.userID);
  try {
    user.savedMovies.push(movie);
    await user.save();
    res.status(201).json({ savedMovies: user.savedMovies });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get id of saved recipes
router.get("/savedMovies/ids/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    res.status(201).json({ savedMovies: user?.savedMovies });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get saved recipes
router.get("/savedMovies/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    const savedMovies = await MovieModel.find({
      _id: { $in: user.savedMovies },
    });

    console.log(savedMovies);
    res.status(201).json({ savedMovies });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export { router as MoviesRouter };
