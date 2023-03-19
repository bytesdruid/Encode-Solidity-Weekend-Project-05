import { useAccount, useContract, usePrepareContractWrite, useContractWrite } from 'wagmi'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { BigNumber, ethers, providers, Signer } from 'ethers';
import lotteryJson from '../assets/Lottery.json';
import React from 'react';
import { parseBytes32String } from 'ethers/lib/utils.js';

export const ReturnTokens = () => {
    const [amount, setAmount] = React.useState("0")
    const { address, isConnected, isDisconnected } = useAccount()
    // const formatAmount = parseBytes32String(amount)
    const formatEtherAmount = ethers.utils.parseEther(amount)
    const { config } = usePrepareContractWrite({
        address: '0xdaD7677997871308ab84E22C93A6231cAe0B67f3',
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
        args: [formatEtherAmount],
    })
    const { data, isLoading, isSuccess, write } = useContractWrite(config)
      
    if (isConnected) {
        return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography component={'span'} variant={'body1'} align={'center'}>
                        ReturnTokens Component - Burn tokens and get ether back.
                        <div>
                            <button disabled={!write} onClick={() => write?.()}>
                                Return Tokens
                            </button>
                            {isLoading && <div>Check Wallet</div>}
                            {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
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
