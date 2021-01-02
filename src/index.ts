import * as CryptoJS from "crypto-js";

class Block {
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    constructor(index: number, hash: string, previousHash: string, data: string, timestamp: number) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }

    static calculateBlockHash = (index: number, previousHash: string, timestamp: number, data: string): string => CryptoJS.SHA256(index + previousHash + timestamp + data).toString()
    static validateBlock = (aBlock: Block): boolean =>
        typeof aBlock.index === "number" &&
        typeof aBlock.hash === "string" &&
        typeof aBlock.previousHash === "string" &&
        typeof aBlock.timestamp === "number" &&
        typeof aBlock.data === "string";

}
const genesisBlock: Block = new Block(0, "2020202020", "", "Hello!", 123456)

let blockchain: [Block] = [genesisBlock]

const getBlockchain = (): Block[] => blockchain;

const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

const getNewTimestamp = (): number => Math.round(new Date().getTime() / 1000);

const creatNewBlock = (data: string): Block => {
    const previousBlock: Block = getLatestBlock();
    const newIndex: number = previousBlock.index + 1;
    const nextTimestamp: number = getNewTimestamp();
    const nextHash: string = Block.calculateBlockHash(newIndex, previousBlock.hash, nextTimestamp, data);
    const newBlock: Block = new Block(newIndex, nextHash, previousBlock.hash, data, nextTimestamp);

    addBlock(newBlock)

    return newBlock;
}

const getHashforBlock = (aBlock: Block): string => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data)

const isBlockValid = (candidateBlock: Block, previouesBlock: Block): boolean => {
    if (!Block.validateBlock(candidateBlock)) {
        return false;
    } else if (previouesBlock.index + 1 !== candidateBlock.index) {
        return false;
    } else if (previouesBlock.hash !== candidateBlock.previousHash) {
        return false;
    } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    } else {
        return true
    }
};

const addBlock = (candidateBlock: Block): void => {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockchain.push(candidateBlock)
    }
}

creatNewBlock('hello')
creatNewBlock('bye')
creatNewBlock('finish!')

console.log(blockchain)

export { };