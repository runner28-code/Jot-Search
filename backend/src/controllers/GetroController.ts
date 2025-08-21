import { GetroService } from '../services/GetroService';

@Controller()
export class GetroController {
  @Authorized()
  @Get('/getro/companies')
  async getCompanies() {
    return await (await GetroService.getClient()).getCompanies();    
  }
  
  @Authorized()
  @Get('/getro/members')
  async getMembers() {
    return await (await GetroService.getClient()).getMembers();    
