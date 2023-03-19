import { ethers } from "ethers";
import { useAccount, useContractRead } from 'wagmi';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { LOTTERY_CONTRACT_ADDRESS, LOTTERY_ABI } from "../../constants/contracts";

export const BetsClosingTime = () => {
    const { address, isConnected, isDisconnected } = useAccount()
    const { data, isError, isLoading } = useContractRead({
        address: LOTTERY_CONTRACT_ADDRESS,
        abi: LOTTERY_ABI,
        functionName: 'betsClosingTime',
      })
      
    if (isConnected && data) {
        const closingTimeDate = data.toString();
        console.log(closingTimeDate)
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