import express, { Request, Response, Router } from "express";
import "reflect-metadata";
import dotenv from "dotenv";
import { Action, useExpressServer } from "routing-controllers";
import path from "path";
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
      Bucket: process.env.S3_BUCKET,
    }

    let put = s3.upload(params)

    try {
      const response = await put.promise()
  
      res.status(200).send({
        file: response.Location,
        result: true,
      })
    } catch (e) {
      console.error("error", e);
      res.status(500).send({
        result: false,
        error: e
      })
    }
  });
}

const getActualRequestDurationInMs = (start: any) => {
  const NS_PER_SEC = 1e9;
  const NS_TO_MS = 1e6;
  const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

const logger = (req: Request, res: Response, next: NextFunction) => {
  let current_datetime = new Date();
  let formatted_date =
    current_datetime.getFullYear() +
