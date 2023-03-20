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

    const { data: state } = useContractRead({
        address: LOTTERY_CONTRACT_ADDRESS,
        abi: LOTTERY_ABI,
        functionName: 'betsOpen',
    });
    
    if (isConnected && data) {
        const betState = state?.toString() === 'true' ? 'OPEN' : 'CLOSED';
        const closingTimeDateString = data.toString();
        const closingDate = betState == "OPEN" ? new Date(parseInt(closingTimeDateString) * 1000) : "BETTING CLOSED";

        console.log(closingDate)
        if(closingDate) {
            return (
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography component={'span'} variant={'body1'} align={'center'}>
                            <div>Current betting closing time is: <br/>
                                <>
                                    {closingDate.toLocaleString()}
                                </>
                            </div>
                        </Typography>
                    </CardContent>
                </Card>
            );
        }
    }
    return <div>Not Connected</div>
}