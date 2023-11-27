import { Request } from 'express';

export interface ShowRequesProps extends Request {
  theatreId: number;
  date: string;
}