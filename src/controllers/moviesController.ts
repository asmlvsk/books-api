import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { data, movies } from '../services/dataConstants';
import fs from 'fs';
import path from 'path';

export const getMovies = async (req: Request, res: Response) => {
  res.send(movies);
};

export const getMovie = async (req: Request, res: Response) => {
  const findRandomMovie = movies[Math.floor(Math.random() * movies.length)];
  const findMovieDuration = movies.filter(
    (movie) => +movie.runtime > +req.query.runtime! - 10 && +movie.runtime < +req.query.runtime! + 10,
  );

  const queryGenres = req.query.genres as string[] | null;
  const isGenresPresented = (element: string) => queryGenres?.includes(element);
  const filtredMovies = movies
    .filter((movie) => movie.genres.some(isGenresPresented))
    .sort((a, b) => b.genres.length - a.genres.length);

  switch (true) {
    case !!(req.query.genres && req.query.runtime):
      res.send(
        filtredMovies.filter(
          (movie) => +movie.runtime > +req.query.runtime! - 10 && +movie.runtime < +req.query.runtime! + 10,
        ),
      );
      break;
    case !!req.query.genres:
      res.send(filtredMovies);
      break;
    case !!req.query.runtime:
      res.send(findMovieDuration[Math.floor(Math.random() * findMovieDuration.length)]);
      break;
    default:
      res.send(findRandomMovie);
      break;
  }
};

export const postMovie = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const last = movies[movies.length - 1];
  movies.push({
    id: Number(last.id) + 1,
    title: req.body.title,
    year: req.body.year,
    runtime: req.body.runtime,
    genres: req.body.genres,
    director: req.body.director,
    actors: req.body.actors,
    plot: req.body.plot,
    posterUrl: req.body.posterUrl,
  });
  saveMovie();
  res.json({
    status: 'success',
    stateInfo: req.body,
  });
};

const saveMovie = () => {
  fs.writeFile(path.join(__dirname, '../data/db.json'), JSON.stringify(data, null, 2), (error) => {
    if (error) {
      throw error;
    }
  });
};
