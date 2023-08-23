import { Injectable } from '@nestjs/common';
import { getBalance, joinGame, winner, getIndexGame, buySkin , getListSkin} from 'helper/getBalance';
import { UserUnauthorizedException } from './exceptions/auth.exceptions';
import Web3 from "web3";

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getUserBalace(user: string) {
    return await getBalance(user)
  }

  async userGetListSkin(user: string) {
    return await getListSkin(user);
  }

  async getIndex() {
    return await getIndexGame()
  }

  async userBuySkin(user: string, cost: number, id: number): Promise<boolean> {
    return await buySkin(user, cost, id)
  }

  async joinGame(user: string): Promise<boolean> {
    return await joinGame(user)
  }

  async winner(gameIndex: number, data: boolean[]): Promise<boolean> {
    return await winner(gameIndex, data)
  }
}


