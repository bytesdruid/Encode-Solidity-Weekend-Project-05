import React from 'react';
import { ethers } from 'ethers';
import { useAccount, useContract, usePrepareContractWrite, useContractWrite } from 'wagmi';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { LOTTERY_CONTRACT_ADDRESS, LOTTERY_ABI } from "../constants/contracts";


export const BuyTokens = () => {
    const TOKEN_RATIO = 1000;
    const [amount, setAmount] = React.useState("0")
    const { address, isConnected, isDisconnected } = useAccount()
    const formatEtherAmount = parseInt(amount) > 0 ? ethers.utils.parseEther(amount).div(TOKEN_RATIO) : ethers.utils.parseEther("0");
    const { config } = usePrepareContractWrite({
        address: LOTTERY_CONTRACT_ADDRESS,
        abi: LOTTERY_ABI,
        functionName: 'purchaseTokens',
        args: [{value: formatEtherAmount}],
    })
    const { data, isLoading, isSuccess, write } = useContractWrite(config)
      
    const purchaseHandler = () => {
        if (parseInt(amount) > 0) write?.();
        else alert('Please enter an amount greater than 0')
    }
    if (isConnected) {
        return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography component={'span'} variant={'body1'} align={'center'}>
                        <div>
                            <button disabled={!write} onClick={purchaseHandler}>
                                Purchase Tokens
                            </button>
                            {isLoading && <div>Check Wallet</div>}
                            {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
                        </div>
                        <div>
                            <input
                                id="amount"
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Amount of tokens to purchase."
                                value={amount}
                            />
                        </div>
                    </Typography>
                </CardContent>
            </Card>
      );
    }
    return <div>Not Connected</div>
}
