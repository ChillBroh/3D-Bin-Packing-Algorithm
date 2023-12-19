/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('pack-items')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  binPacking(@Body() requestData: any): any {
    console.log(requestData);
    const result = this.appService.binPacking3D(requestData);
    return { result };
  }
}
