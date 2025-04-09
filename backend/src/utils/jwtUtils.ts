import jwt from 'jsonwebtoken';
import { User as DbUser } from "prisma/prisma-client";

export const CreateJwtToken = (data: any) => {
  const token = jwt.sign(
    data,
