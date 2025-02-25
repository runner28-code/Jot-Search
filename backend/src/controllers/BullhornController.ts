import { Controller, Param, Body, Get, Post, Put, Delete, QueryParam, Authorized } from 'routing-controllers';
import { BullhornService } from '../services/BullhornService';

@Controller()
export class BullhornController {
  // @Authorized()
