import { Request } from 'express';

export interface TheatreRequestProps extends Request {
  city: string;
}