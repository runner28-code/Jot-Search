import jwt from 'jsonwebtoken';
import { User as DbUser } from "prisma/prisma-client";
import config from '../config';

export const CreateJwtToken = (data: any) => {
  const token = jwt.sign(
    data,
    config.authSecret || 'inTulsa',
  );
  return token;
}

export const VerifyJwtToken = (token: string) => {
  try {
    const decode: any = jwt.decode(token);
    if (decode) {
