import { useAccount } from 'wagmi'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export const BuyTokens = () => {
    const { address, isConnected, isDisconnected } = useAccount()
    if (isConnected) {
        return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="body1">
                    <center>PLACEHOLDER - BUY TOKENS</center>
                    </Typography>
                </CardContent>
            </Card>
      );
    }
    return <div>Not Connected</div>
}
