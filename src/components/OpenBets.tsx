import React from 'react';
import { useAccount, usePrepareContractWrite, useContractWrite } from 'wagmi'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ethers, BigNumber} from 'ethers';
import { LOTTERY_CONTRACT_ADDRESS, LOTTERY_ABI } from "../constants/contracts";

export const OpenBets = () => {
    const [closingTime, setClosingTime] = React.useState("0")
    const closingTimeNumber = BigNumber.from(closingTime)
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
                        </div>
                        <div>
                            <input
                                id="closingBlockNumber"
                                onChange={(e) => setClosingTime(e.target.value)}
                                placeholder="Closing block number."
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
