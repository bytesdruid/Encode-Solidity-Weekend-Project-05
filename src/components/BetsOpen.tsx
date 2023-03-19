import { useAccount, useContract, usePrepareContractWrite, useContractWrite, useContractReads, useContractRead } from 'wagmi'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { BigNumber, providers, Signer } from 'ethers';
import lotteryJson from '../assets/Lottery.json';

export const BetsOpen = () => {
    const { address, isConnected, isDisconnected } = useAccount()
    const { data, isError, isLoading } = useContractRead({
        address: '0xdaD7677997871308ab84E22C93A6231cAe0B67f3',
        abi: lotteryJson.abi,
        functionName: 'betsOpen',
      })
      
    if (isConnected) {
        return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography component={'span'} variant={'body1'} align={'center'}>
                        BetsOpen Component - Displays if betting is open.
                        {!isError && <div>Betting is currently open: {JSON.stringify(data)}</div>}
                    </Typography>
                </CardContent>
            </Card>
      );
    }
    return <div>Not Connected</div>
}