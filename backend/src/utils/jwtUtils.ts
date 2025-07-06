import jwt from 'jsonwebtoken';
import config from '../config';

export const CreateJwtToken = (data: any) => {
  const token = jwt.sign(
    data,
    config.authSecret || 'inTulsa',
    { expiresIn: 2 * 3600 }
  );
  return token;
}

