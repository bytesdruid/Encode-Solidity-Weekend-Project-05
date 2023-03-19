import { useAccount, useContract, usePrepareContractWrite, useContractWrite } from 'wagmi'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { BigNumber, ethers, providers, Signer } from 'ethers';
import lotteryJson from '../assets/Lottery.json';
import React from 'react';
import { parseBytes32String } from 'ethers/lib/utils.js';

export const BuyTokens = () => {
    const [amount, setAmount] = React.useState("0")
    const { address, isConnected, isDisconnected } = useAccount()
    // const formatAmount = parseBytes32String(amount)
    const formatEtherAmount = ethers.utils.parseEther(amount)
    const { config } = usePrepareContractWrite({
        address: '0xdaD7677997871308ab84E22C93A6231cAe0B67f3',
        abi: lotteryJson.abi,
        functionName: 'purchaseTokens',
        args: [{value: formatEtherAmount}],
    })
    const { data, isLoading, isSuccess, write } = useContractWrite(config)
      
    if (isConnected) {
        return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography component={'span'} variant={'body1'} align={'center'}>
                        BuyTokens Component - Purchase tokens for betting rights.
                        <div>
                            <button disabled={!write} onClick={() => write?.()}>
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
