import { BullhornService } from '../services/BullhornService';

@Controller()
export class BullhornController {
  // @Authorized()
  @Get('/bullhorn/companies')
