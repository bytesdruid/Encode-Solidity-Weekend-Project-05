import { useAccount, useContractRead, useBalance } from 'wagmi'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Alert, CircularProgress, CircularProgressClasses } from '@mui/material';
import { LOTTERY_TOKEN_ADDRESS } from '../../constants/contracts';


export const UserBalanceDisplay = () => {
    const { address, isConnected, isDisconnected } = useAccount();
    const { data, isError, isLoading } = useBalance({
        address: address,
        token: LOTTERY_TOKEN_ADDRESS,
    })

    if (isConnected) {
        if (isLoading) return <CircularProgress color="secondary" />
        if (isError) return <Alert severity="error">Error fetching balance</Alert>
        return (
            <div style={{ textAlign: "center"}}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography component={'span'} variant={'body1'} align="center">
                            User Balance: <strong>{data?.formatted} {data?.symbol}</strong>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        );
    }
    return <div>Wallet is not connected, please reconnect</div>
}