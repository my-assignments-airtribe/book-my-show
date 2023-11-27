import { Request } from 'express';

export interface BookingRequestProps extends Request {
  userId: number;
}