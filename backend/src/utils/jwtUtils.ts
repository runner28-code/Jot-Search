import jwt from 'jsonwebtoken';
import { User as DbUser } from "prisma/prisma-client";
import config from '../config';

export const CreateJwtToken = (data: any) => {
  const token = jwt.sign(
    data,
    { expiresIn: 2 * 3600 }
  );
  return token;
}

export const VerifyJwtToken = (token: string) => {
  try {
    const decode: any = jwt.decode(token);
    if (decode) {
      return decode;
    }
    return null;
