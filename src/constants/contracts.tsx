import lotteryJson from '../assets/Lottery.json';
import lotteryTokenJson from '../assets/LotteryToken.json';

const LOTTERY_CONTRACT_ADDRESS = '0x89f957389784DbB036d9F32F3358cd32B22F9ac8';
const LOTTERY_TOKEN_ADDRESS = "0x8018f4655a87a7be462b72dcb967e67fff515a52";

const LOTTERY_ABI = lotteryJson.abi;
const LOTTERY_TOKEN_ABI = lotteryTokenJson.abi;

export { LOTTERY_CONTRACT_ADDRESS, LOTTERY_TOKEN_ADDRESS, LOTTERY_ABI, LOTTERY_TOKEN_ABI};