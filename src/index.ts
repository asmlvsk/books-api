import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { validationResult } from 'express-validator';
import fs from 'fs';
import { validationSchema } from './helpers/PostMovieValidation';
import { data, genres, movies } from './services/dataConstants';
import moviesRoutes from './routes/movies';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.raw());

app.get('/', (req: Request, res: Response) => {
  res.send('Movies - /movies');
});

app.use(moviesRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
