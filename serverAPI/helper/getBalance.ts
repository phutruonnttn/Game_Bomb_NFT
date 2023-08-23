import Web3 from "web3";
import { erc20 } from "abis/erc20";
import { in_game } from "abis/ingame";
import { erc1155 } from "abis/erc1155";

let preTime = 0;
let diffAdd = 0;

export async function getBalance(user: string): Promise<string> {
    const web3: any = new Web3(process.env.MUMBAI_RPC);

    const contractERC20 = new web3.eth.Contract(
        erc20,
        process.env.ERC20_ADDRESS,
    );

    const balance = await contractERC20.methods.balanceOf(user).call()
    return balance.toString();
}

export async function getListSkin(user: string): Promise<Number[]> {
    const web3: any = new Web3(process.env.MUMBAI_RPC);

    const contractERC1155 = new web3.eth.Contract(
        erc1155,
        process.env.ERC1155_ADDRESS,
    );

    let listSkin: number[] = [];
    for (let i = 0; i < 6; i++) {
        let num = await contractERC1155.methods.balanceOf(user, i).call()
        listSkin.push(Number(num));
    }

    return listSkin;
}

export async function getIndexGame(): Promise<string> {
    const web3: any = new Web3(process.env.MUMBAI_RPC);

    const contractIngame = new web3.eth.Contract(
        in_game,
        process.env.INGAME_ADDRESS,
    );

    const indexGame = await contractIngame.methods.getIndexGame().call()
    return indexGame;
}

export async function joinGame(user: string): Promise<boolean> {
    const web3: any = new Web3(process.env.MUMBAI_RPC);

    const contractIngame = new web3.eth.Contract(
        in_game,
        process.env.INGAME_ADDRESS,
    );

    const txEncode = await contractIngame.methods.joinGame(user).encodeABI()
    const user_pk = process.env.PK;

    const sender = web3.eth.accounts.privateKeyToAccount(user_pk!).address;

    let txCount = await web3.eth.getTransactionCount(sender);
    const gasPrice = await web3.eth.getGasPrice();

    let now = Date.now()
    let diffNow = (now - preTime) / 1000    

    // neu request < 3s thi +1 vao txCount
    if (diffNow < 3) {
        diffAdd += 1;
        txCount += BigInt(diffAdd);
    } else {
        diffAdd = 0;
    }
    
    preTime = now;

    const txObj = {
        nonce: txCount,
        gasLimit: web3.utils.toHex(10000000),
        gasPrice: gasPrice,
        data: txEncode,
        to: process.env.INGAME_ADDRESS,
        from: sender,
    };

    const signedTx = await web3.eth.accounts.signTransaction(txObj, user_pk!);
    const result = await web3.eth.sendSignedTransaction(signedTx.rawTransaction!);

    const event = await contractIngame.getPastEvents("JoinGame", {
        fromBlock: result.block,
        toBlock: result.block,
    });

    console.log(event)

    return true;
}

export async function buySkin(user: string, cost: number, id: number): Promise<boolean> {
    const web3: any = new Web3(process.env.MUMBAI_RPC);

    const contractIngame = new web3.eth.Contract(
        in_game,
        process.env.INGAME_ADDRESS,
    );

    const txEncode = await contractIngame.methods.buySkin(user, cost, id).encodeABI()
    const user_pk = process.env.PK;

    const sender = web3.eth.accounts.privateKeyToAccount(user_pk!).address;

    let txCount = await web3.eth.getTransactionCount(sender);
    const gasPrice = await web3.eth.getGasPrice();


    let now = Date.now()
    let diffNow = (now - preTime) / 1000    

    // neu request < 3s thi +1 vao txCount
    if (diffNow < 3) {
        diffAdd += 1;
        txCount += BigInt(diffAdd);
    } else {
        diffAdd = 0;
    }
    
    preTime = now;

    const txObj = {
        nonce: txCount,
        gasLimit: web3.utils.toHex(10000000),
        gasPrice: gasPrice,
        data: txEncode,
        to: process.env.INGAME_ADDRESS,
        from: sender,
    };

    const signedTx = await web3.eth.accounts.signTransaction(txObj, user_pk!);
    const result = await web3.eth.sendSignedTransaction(signedTx.rawTransaction!);

    const event = await contractIngame.getPastEvents("BuySkin", {
        fromBlock: result.block,
        toBlock: result.block,
    });

    // console.log(event)

    return true;
}

export async function winner(gameIndex: number, data: boolean[]): Promise<boolean> {
    const web3: any = new Web3(process.env.MUMBAI_RPC);

    const contractIngame = new web3.eth.Contract(
        in_game,
        process.env.INGAME_ADDRESS,
    );

    const txEncode = await contractIngame.methods.finalGame(data, gameIndex).encodeABI()
    const user_pk = process.env.PK;

    const sender = web3.eth.accounts.privateKeyToAccount(user_pk!).address;

    let txCount = await web3.eth.getTransactionCount(sender);
    const gasPrice = await web3.eth.getGasPrice();

    let now = Date.now()
    let diffNow = (now - preTime) / 1000    

    // neu request < 3s thi +1 vao txCount
    if (diffNow < 3) {
        diffAdd += 1;
        txCount += BigInt(diffAdd);
    } else {
        diffAdd = 0;
    }
    
    preTime = now;

    const txObj = {
        nonce: txCount,
        gasLimit: web3.utils.toHex(10000000),
        gasPrice: gasPrice,
        data: txEncode,
        to: process.env.INGAME_ADDRESS,
        from: sender,
    };

    const signedTx = await web3.eth.accounts.signTransaction(txObj, user_pk!);
    const result = await web3.eth.sendSignedTransaction(signedTx.rawTransaction!);
    console.log(result);

    return true

}