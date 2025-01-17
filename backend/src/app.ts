import express, { Request, Response, Router } from "express";
import dotenv from "dotenv";
import { Action, useExpressServer } from "routing-controllers";
import path from "path";
import bodyParser from "body-parser";
