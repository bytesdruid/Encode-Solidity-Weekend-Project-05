import { useAccount } from 'wagmi'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export const BetTimer = () => {
    const { address, isConnected, isDisconnected } = useAccount()
    if (isConnected) {
        return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                <Typography component={'span'} variant={'body1'} align={'center'}>
                    PLACEHOLDER - TIMER HERE
                    </Typography>
                </CardContent>
            </Card>
      );
    }
    return <div>Not Connected</div>
}
