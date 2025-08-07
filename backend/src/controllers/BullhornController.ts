import { Controller, Param, Body, Get, Post, Put, Delete, QueryParam, Authorized } from 'routing-controllers';
import { BullhornService } from '../services/BullhornService';

@Controller()
export class BullhornController {
  // @Authorized()
  @Get('/bullhorn/companies')
  async getCompanies() {
    return await (await BullhornService.getClient()).getCompanies();
  }

  // @Authorized()
  @Get('/bullhorn/jobs')
  async getJobs() {
    console.log('~~~~~~')
    return await (await BullhornService.getClient()).getJobs();
  }

  // @Authorized()
  @Get('/bullhorn/clientContacts')
  async getClientContacts() {
    return await (await BullhornService.getClient()).getClientContacts();
  }
