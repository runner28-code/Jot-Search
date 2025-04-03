import jwt from 'jsonwebtoken';
import { User as DbUser } from "prisma/prisma-client";
import config from '../config';

  const token = jwt.sign(
