
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserUnauthorizedException } from '../../exceptions/auth.exceptions';
import Web3 from "web3";

@Injectable()
export class EthLoginAuthGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,

    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();



        const token: string = req.headers.authorization;
        req.user = null;

        if (!token) {
            throw new UserUnauthorizedException(`Not found header token`);
        }
        const verifiedAddress = await this.verifyToken(token);
        req.user = { authorization: token, address: verifiedAddress };
        return true
    }

    async verifyToken(

        token: string
    ) {
        if (!token.startsWith('Bearer')) {
            throw new UserUnauthorizedException(
                `Malformed token, maybe missing Bearer`,
            );
        }
        //Get base64 encoded payload
        const encodedPayload = token.slice(6).trim();
        let payload;

        try {
            payload = JSON.parse(Buffer.from(encodedPayload, 'base64').toString());
        } catch (e) {
            return false;
        }

        console.log(payload)
        try {
            const verifiedAddress =
                await this.verifyEthLoginSignature(
                    payload.duration,
                    payload.signature,
                );
            if (verifiedAddress.toLowerCase() != payload.address.toLowerCase()) {
                console.log("not correct")
                return false;
            }
            return payload.address;
        } catch (e) {
            console.log(e);

        }


    }

    async verifyEthLoginSignature(
        time: string,
        signature: string,
    ) {
        const web3 = new Web3()
        const domain = "BoomBlock Login " + time + "!";
        const tx = web3.eth.accounts.recover(domain, signature)
        console.log(tx)
        return tx;
    }
}
