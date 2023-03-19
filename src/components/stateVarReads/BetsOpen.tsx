import { useAccount, useContract, usePrepareContractWrite, useContractWrite, useContractReads, useContractRead } from 'wagmi'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { BigNumber, providers, Signer } from 'ethers';
import { LOTTERY_CONTRACT_ADDRESS, LOTTERY_ABI } from "../../constants/contracts";

export const BetsOpen = () => {
    const { address, isConnected, isDisconnected } = useAccount()
    const { data, isError, isLoading } = useContractRead({
        address: LOTTERY_CONTRACT_ADDRESS,
        abi: LOTTERY_ABI,
        functionName: 'betsOpen',
      })
      
    if (isConnected) {
        return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography component={'span'} variant={'body1'} align={'center'}>
                        {!isError && <div>Betting is currently open: {JSON.stringify(data)}</div>}
                    </Typography>
                </CardContent>
            </Card>
      );
    }
    return <div>Not Connected</div>
}