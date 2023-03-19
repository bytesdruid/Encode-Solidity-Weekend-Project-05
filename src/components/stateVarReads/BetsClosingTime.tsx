import { useAccount, useContract, usePrepareContractWrite, useContractWrite, useContractReads, useContractRead } from 'wagmi'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import lotteryJson from '../../assets/Lottery.json';

export const BetsClosingTime = () => {
    const { address, isConnected, isDisconnected } = useAccount()
    const { data, isError, isLoading } = useContractRead({
        address: '0xdaD7677997871308ab84E22C93A6231cAe0B67f3',
        abi: lotteryJson.abi,
        functionName: 'betsClosingTime',
      })
      
    if (isConnected) {
        return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography component={'span'} variant={'body1'} align={'center'}>
                        {!isError && <div>Betting closing time is: {JSON.stringify(data)}</div>}
                    </Typography>
                </CardContent>
            </Card>
      );
    }
    return <div>Not Connected</div>
}