import { useAccount, useContractRead, useBalance } from 'wagmi'
import lotteryTokenABI from '../assets/LotteryToken.json';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export const BalanceDisplay = () => {
    const { address, isConnected, isDisconnected } = useAccount();
    const { data, isError, isLoading } = useBalance({
        address: address,
        token: '0xdfd4c5dd8ec6b24add525d4e2b9630a1733610b6',
    })

    if (isConnected) {
        if (isLoading) return <div>Fetching balance…</div>
        if (isError) return <div>Error fetching balance</div>
        return (
            <div style={{ textAlign: "center"}}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography component={'span'} variant={'body1'} align="center">
                            Balance: <strong>{data?.formatted} {data?.symbol}</strong>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        );
    }
    return <div>Wallet is not connected, please reconnect</div>
}