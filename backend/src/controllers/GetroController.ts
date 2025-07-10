import { Controller, Param, Body, Get, Post, Put, Delete, QueryParam, Authorized } from 'routing-controllers';
import { GetroService } from '../services/GetroService';

@Controller()
export class GetroController {
  @Authorized()
  @Get('/getro/companies')
  async getCompanies() {
    return await (await GetroService.getClient()).getCompanies();    
  }
  
  @Authorized()
