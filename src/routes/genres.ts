import express from 'express';
import { getGenres } from '../controllers/genresController';

const router = express.Router();

router.get('/genres', getGenres);

export default router;
