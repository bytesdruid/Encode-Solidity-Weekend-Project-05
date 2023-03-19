import { useAccount, usePrepareSendTransaction, useSendTransaction } from 'wagmi'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { BigNumber } from 'ethers';

export const BuyTokens = () => {
    const { address, isConnected, isDisconnected } = useAccount()
    const { config } = usePrepareSendTransaction({
        request: { to: 'moxey.eth', value: BigNumber.from('10000000000000000') },
      })
      
    if (isConnected) {
        return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                <Typography component={'span'} variant={'body1'} align={'center'}>
                    PLACEHOLDER - BUY TOKENS
                    // usePrepareSendTransaction
                    // useSendTransaction
                    </Typography>
                </CardContent>
            </Card>
      );
    }
    return <div>Not Connected</div>
}

// usePrepareTx gives back a prepared configuration object to be sent to the blockchain using useSendTransaction
