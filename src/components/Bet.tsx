import React from 'react';
import { ethers } from 'ethers';
import { useAccount, useContract, useSigner } from 'wagmi'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { LOTTERY_CONTRACT_ADDRESS, LOTTERY_ABI, LOTTERY_TOKEN_ADDRESS, LOTTERY_TOKEN_ABI} from "../constants/contracts";

export const Bet = () => {
    const [tokens, setTokens] = React.useState('');

    const { isConnected } = useAccount();
    const { data: signer, isError, isLoading } = useSigner()
    const lotteryC = useContract({
        address: LOTTERY_CONTRACT_ADDRESS,
        abi: LOTTERY_ABI,
        signerOrProvider: signer,
    });

    const tokenC = useContract({
        address: LOTTERY_TOKEN_ADDRESS,
        abi: LOTTERY_TOKEN_ABI,
        signerOrProvider: signer,
    });

    async function handleSubmit() {
        if(lotteryC && tokenC) {
            const allowTx = await tokenC.approve(LOTTERY_CONTRACT_ADDRESS, ethers.utils.parseEther(tokens));
            const receiptAllow = await allowTx.wait();
            console.log(`Allowance confirmed (${receiptAllow.transactionHash})\n`);
            const tx = await lotteryC.bet();
            const receipt = await tx.wait();
            console.log(`Burn confirmed (${receipt.transactionHash})\n`);
        }
    }
    if (isConnected) {
         return (
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography component={'span'} variant={'body1'} align={'center'}>
                            <div>
                                <input
                                    value={tokens}
                                    onChange={e => setTokens(e.target.value)}
                                    placeholder="enter token amount"
                                    min={1}
                                    type="number" />
                                <button onClick={handleSubmit}>
                                    Bet
                                </button>
                            </div>
                        </Typography>
                    </CardContent>
                </Card>
        )
    }
    return <div>Not Connected</div>
}