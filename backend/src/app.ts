import express, { Request, Response, Router } from "express";
import "reflect-metadata";
import dotenv from "dotenv";
import { Action, useExpressServer } from "routing-controllers";
import bodyParser from "body-parser";
import cors from "cors";
import { NextFunction } from "connect";
import { VerifyJwtToken } from "./utils/jwtUtils";
import { findUserByEmail } from "./services/User";
import { genUUID } from "./utils";
import fs from "fs";
import AWS from "aws-sdk"
import { IncomingForm } from "formidable"

dotenv.config();

let s3: any;
try {
  s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  endpoint: process.env.S3_ENDPOINT,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
})
} catch (error) {
  console.error(error)
}

const uploadToS3 = async(req: any, res: any) => {
  console.log("uploading to s3");
  if(!process.env.S3_BUCKET) {
    res.status(500).send("S3_BUCKET not set")
    return
  }

  const form = new IncomingForm() as any
  form.uploadDir = path.join(__dirname, "..", "uploads");
  form.keepExtensions = true
  form.parse(req, async (err: any, fields: any, files: any) => {
    const fileObject = await files.file

    const buffer = fs.readFileSync(fileObject.filepath)

    const uuid = genUUID()

    const params = {
      Key: uuid,
      ContentType: fileObject.type,
      Body: buffer,
