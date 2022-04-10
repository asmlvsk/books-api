import { Request, Response } from 'express';
import { genres } from '../services/dataConstants';

export const getGenres = async (req: Request, res: Response) => {
  res.send(genres);
};
