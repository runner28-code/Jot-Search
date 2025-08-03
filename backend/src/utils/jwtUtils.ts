import jwt from 'jsonwebtoken';
import { User as DbUser } from "prisma/prisma-client";

export const CreateJwtToken = (data: any) => {
  const token = jwt.sign(
    data,
    config.authSecret || 'inTulsa',
    { expiresIn: 2 * 3600 }
  );
  return token;
}

export const VerifyJwtToken = (token: string) => {
  try {
