import { Controller, Param, Body, Get, Post, Put, Delete, QueryParam, Authorized } from 'routing-controllers';

@Controller()
export class GetroController {
  @Authorized()
  @Get('/getro/companies')
  async getCompanies() {
