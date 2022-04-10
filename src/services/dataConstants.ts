import { Movie } from '../interfaces/Movie';

export const data = require('../data/db.json');

export const movies: Movie[] = data.movies;
export const genres: string[] = data.genres;
