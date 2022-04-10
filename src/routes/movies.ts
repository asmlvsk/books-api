import express from 'express';
import { getMovie, getMovies, postMovie } from '../controllers/moviesController';

const router = express.Router();

router.get('/movies', getMovies);
router.get('/movie', getMovie);
router.post('/movies', postMovie);

export default router;
