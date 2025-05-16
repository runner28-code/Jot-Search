import { Controller, Param, Body, Get, Post, Put, Delete, QueryParam, Authorized } from 'routing-controllers';
import { BullhornService } from '../services/BullhornService';

@Controller()
export class BullhornController {
  // @Authorized()
  @Get('/bullhorn/companies')
  async getCompanies() {
    return await (await BullhornService.getClient()).getCompanies();
  }

  @Get('/bullhorn/jobs')
  async getJobs() {
