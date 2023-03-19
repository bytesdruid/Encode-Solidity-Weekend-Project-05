import { useAccount, useContract, usePrepareContractWrite, useContractWrite } from 'wagmi'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { BigNumber, ethers, providers, Signer, utils } from 'ethers';
import lotteryJson from '../assets/Lottery.json';
import React from 'react';
import { parseBytes32String } from 'ethers/lib/utils.js';

export const OpenBets = () => {
    const [closingTime, setClosingTime] = React.useState("0")
    const closingTimeNumber = parseInt(closingTime)
    const { address, isConnected, isDisconnected } = useAccount()
    const { config } = usePrepareContractWrite({
        address: '0xdaD7677997871308ab84E22C93A6231cAe0B67f3',
        abi: lotteryJson.abi,
        functionName: 'openBets',
        args: [closingTime],
    })
    const { data, isLoading, isSuccess, write } = useContractWrite(config)
      
    if (isConnected) {
        return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography component={'span'} variant={'body1'} align={'center'}>
                        <div>
                            <button disabled={!write} onClick={() => write?.()}>
                                Open Bets
                            </button>
                            {isLoading && <div>Check Wallet</div>}
                            {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
                            {<div>Num: {closingTimeNumber}</div>}
                        </div>
                        <div>
                            <input
                                id="amount"
                                onChange={(e) => setClosingTime(e.target.value)}
                                placeholder="Amount of tokens to purchase."
                                value={closingTime}
                            />
                        </div>
                    </Typography>
                </CardContent>
            </Card>
      );
    }
    return <div>Not Connected</div>
}
