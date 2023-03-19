import { useAccount, useContract, usePrepareContractWrite, useContractWrite, useContractReads, useContractRead } from 'wagmi'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { LOTTERY_TOKEN_ADDRESS } from '../../constants/contracts';


export const PaymentToken = () => {
    const { address, isConnected, isDisconnected } = useAccount()
    if (isConnected) {
        return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography component={'span'} variant={'body1'} align={'center'}>
                        <div>Lottery (LOTO) token address: {LOTTERY_TOKEN_ADDRESS}</div>
                    </Typography>
                </CardContent>
            </Card>
      );
    }
    return <div>Not Connected</div>
}