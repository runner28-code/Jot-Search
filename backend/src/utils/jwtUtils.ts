import jwt from 'jsonwebtoken';
import { User as DbUser } from "prisma/prisma-client";
import config from '../config';

export const CreateJwtToken = (data: any) => {
    data,
    config.authSecret || 'inTulsa',
    { expiresIn: 2 * 3600 }
  );
  return token;
}
