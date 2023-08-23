import { Controller, Get, Param, Post, UseGuards, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { EthLoginAuthGuard } from 'src/shares/guards/eth-login.auth.guard';
import { UserAddress } from 'src/shares/decorators/user-address.decorator';
import { WinnerDto, BuySkinDto } from './dto';

@Controller()

export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/user-balance/:address")
  async getUserBalance(@Param('address') user: string) {
    return await this.appService.getUserBalace(user);
  }

  @Get("/user-skin/:address")
  async getListSkin(@Param('address') user: string) {
    return await this.appService.userGetListSkin(user);
  }


  @Get("/game-index")
  async getIndex() {
    return await this.appService.getIndex();
  }


  @Post("/user-buy-skin")
  async buySkin(@Body() data: BuySkinDto) {
    console.log(data)
    return await this.appService.userBuySkin(data.addr, data.cost, data.id)
  }
  

  @ApiBearerAuth()
  @UseGuards(EthLoginAuthGuard)
  @Post("/user-joingame")
  async joinGame(@UserAddress() address: string) {
    return await this.appService.joinGame(address)
  }


  @Post("/user-winner")
  async winner(@Body() winner: WinnerDto) {
    console.log(winner)
    return await this.appService.winner(winner.gameIndex, winner.arrayData)
  }
}
