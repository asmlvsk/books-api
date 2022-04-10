import { body } from 'express-validator';
import { genres } from '../services/dataConstants';

export const validationSchema = () => {
  return [
    body('title').isLength({ max: 255, min: 3 }).withMessage('Title is too short or too long.'),
    body('year').isInt().isLength({ max: 4, min: 4 }).withMessage('Invalid year.'),
    body('runtime').notEmpty().isInt().isLength({ max: 3, min: 3 }).withMessage('Invalid runtime.'),
    body('genres').isArray().withMessage('Genres must be in array.').isIn(genres),
    body('director').isLength({ max: 255, min: 3 }).withMessage('Invalid director name.'),
    body('actors').optional(),
    body('plot').optional(),
    body('posterUrl').optional(),
  ];
};
