import React from 'react';
import { ethers } from 'ethers';
import { useAccount, useContract, useSigner } from 'wagmi'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { LOTTERY_CONTRACT_ADDRESS, LOTTERY_ABI, LOTTERY_TOKEN_ADDRESS, LOTTERY_TOKEN_ABI} from "../constants/contracts";
import { Button, TextField } from '@mui/material';

export const ReturnTokens = () => {
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
            const tx = await lotteryC.returnTokens(ethers.utils.parseEther(tokens));
            const receipt = await tx.wait();
            console.log(`Burn confirmed (${receipt.transactionHash})\n`);
        }
    }
    if (isConnected) {
         return (
                <Card sx={{ minWidth: 275, minHeight: 90 }}>
                    <CardContent>
                        <Typography component={'span'} variant={'body1'} align={'center'}>
                            <div>
                                <TextField
                                    value={tokens}
                                    onChange={e => setTokens(e.target.value)}
                                    placeholder="enter token amount"
                                    InputProps={{ inputProps: { min: 1 } }}
                                    type="number"
                                    size="small" 
                                    />
                                <Button variant="contained" onClick={handleSubmit}>
                                    refund ETH
                                </Button>
                            </div>
                        </Typography>
                    </CardContent>
                </Card>
        )
    }
    return <div>Not Connected</div>
}