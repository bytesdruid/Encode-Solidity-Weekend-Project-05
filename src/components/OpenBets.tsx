import React from 'react';
import { useAccount, usePrepareContractWrite, useContractWrite } from 'wagmi'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ethers, BigNumber} from 'ethers';
import { LOTTERY_CONTRACT_ADDRESS, LOTTERY_ABI } from "../constants/contracts";
import { Button, TextField } from '@mui/material';

export const OpenBets = () => {
    const [closingTime, setClosingTime] = React.useState("0")
    const closingTimeNumber = BigNumber.from(parseInt(closingTime) > 0 ? closingTime : "0")
    const { address, isConnected, isDisconnected } = useAccount()
    const { config } = usePrepareContractWrite({
        address: LOTTERY_CONTRACT_ADDRESS,
        abi: [
            {
              name: 'openBets',
              type: 'function',
              stateMutability: 'nonpayable',
              inputs: [{ internalType: 'uint256', name: 'closingTime', type: 'uint256' }],
              outputs: [],
            },
        ],
        functionName: 'openBets',
        args: [closingTimeNumber],
    })
    const { data, isLoading, isSuccess, write } = useContractWrite(config)
    
    const openBetsHandler = () => {
        if (parseInt(closingTime) > 0) write?.();
        else alert('Please enter an amount greater than 0')
    }
    
    if (isConnected) {
        return (
            <Card sx={{ minWidth: 275, minHeight: 90 }}>
                <CardContent>
                    <Typography component={'span'} variant={'body1'} align={'center'}>
                        <div>
                            Enter future <a href=" https://www.epochconverter.com/"><strong>EPOCH Timestamp</strong></a>
                            <br/>
                        <TextField
                                id="closingBlockNumber"
                                size="small"
                                onChange={(e) => setClosingTime(e.target.value)}
                                placeholder="EPOCH TIMESTAMP"
                                value={closingTime}
                            />
                            <Button variant="contained" disabled={!write} onClick={openBetsHandler}>
                                Open Bets
                            </Button>
                            {isLoading && <div>Check Wallet</div>}
                            {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
                        </div>
                    </Typography>
                </CardContent>
            </Card>
      );
    }
    return <div>Not Connected</div>
}
