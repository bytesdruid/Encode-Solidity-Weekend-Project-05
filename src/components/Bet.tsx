import React from 'react';
import { ethers } from 'ethers';
import { useAccount, useContract, useSigner } from 'wagmi'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { LOTTERY_CONTRACT_ADDRESS, LOTTERY_ABI, LOTTERY_TOKEN_ADDRESS, LOTTERY_TOKEN_ABI} from "../constants/contracts";
import { sign } from 'crypto';

export const Bet = () => {
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
            const approveTx = await tokenC.approve(LOTTERY_CONTRACT_ADDRESS, ethers.utils.parseEther("2"));
            const receiptApprove = await approveTx.wait();
            console.log(`Approve confirmed (${receiptApprove.transactionHash})\n`);
            const allowanceTx = await tokenC.allowance(LOTTERY_CONTRACT_ADDRESS, LOTTERY_TOKEN_ADDRESS);
            const tx = await lotteryC.bet();
            const receipt = await tx.wait();
            console.log(`Bet confirmed (${receipt.transactionHash})\n`);
        }
    }
    if (isConnected) {
         return (
                <Card sx={{ minWidth: 275, minHeight: 90, paddingY: '12px'  }}>
                    <CardContent>
                        <Typography component={'span'} variant={'body1'} align={'center'}>
                            <div>
                                <Button variant="contained" color="success" size="large" onClick={handleSubmit}>
                                    Bet!
                                </Button>
                            </div>
                        </Typography>
                    </CardContent>
                </Card>
        )
    }
    return <div>Not Connected</div>
}