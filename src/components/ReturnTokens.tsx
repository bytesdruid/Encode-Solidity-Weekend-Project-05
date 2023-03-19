import React from 'react';
import { BigNumber, ethers } from 'ethers';
import { useAccount, usePrepareContractWrite, useContractWrite } from 'wagmi'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { LOTTERY_CONTRACT_ADDRESS, LOTTERY_ABI } from "../constants/contracts";

export const ReturnTokens = () => {
    const [amount, setAmount] = React.useState("0")
    const { address, isConnected, isDisconnected } = useAccount()
    const BnAmount = ethers.utils.parseEther(amount)
    const { config } = usePrepareContractWrite({
        address: LOTTERY_CONTRACT_ADDRESS,
        abi: [
            {
              name: 'returnTokens',
              type: 'function',
              stateMutability: 'nonpayable',
              inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
              outputs: [],
            },
        ],
        functionName: 'returnTokens',
        args: [BnAmount],
    })
    const { data, isLoading, isSuccess, write } = useContractWrite(config)
      
    if (isConnected) {
        return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography component={'span'} variant={'body1'} align={'center'}>
                        <div>
                            <button disabled={!write} onClick={() => write?.()}>
                                Return Tokens
                            </button>
                            {isLoading && <div>Check Wallet</div>}
                            {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
                            {<div>{amount}</div>}
                        </div>
                        <div>
                            <input
                                id="amount"
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Amount of tokens to burn."
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
