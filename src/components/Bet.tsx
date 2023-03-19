import { useAccount, usePrepareContractWrite, useContractWrite } from 'wagmi'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { LOTTERY_CONTRACT_ADDRESS, LOTTERY_ABI } from "../constants/contracts";

export const Bet = () => {
    const { address, isConnected, isDisconnected } = useAccount()
    const { config } = usePrepareContractWrite({
        address: LOTTERY_CONTRACT_ADDRESS,
        abi: LOTTERY_ABI,
        functionName: 'bet',
    })
    const { data, isLoading, isSuccess, write } = useContractWrite(config)
      
    if (isConnected) {
        return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography component={'span'} variant={'body1'} align={'center'}>
                        Bet Component - Submits a bet using the constructor bet price and bet fee.
                        <div>
                            <button disabled={!write} onClick={() => write?.()}>
                                Bet
                            </button>
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
