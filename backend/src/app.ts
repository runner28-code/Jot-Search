import express, { Request, Response, Router } from "express";
import "reflect-metadata";
import dotenv from "dotenv";
import { Action, useExpressServer } from "routing-controllers";
import path from "path";
