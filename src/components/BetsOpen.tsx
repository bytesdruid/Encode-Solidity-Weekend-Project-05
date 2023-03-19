import { useAccount, useContract, usePrepareContractWrite, useContractWrite, useContractReads } from 'wagmi'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { BigNumber, providers, Signer } from 'ethers';
import lotteryJson from '../assets/Lottery.json';

export const BuyTokens = () => {
    const { address, isConnected, isDisconnected } = useAccount()
    // address: '0xdaD7677997871308ab84E22C93A6231cAe0B67f3',
    // abi: lotteryJson.abi,
    const { data, isError, isLoading } = useContractReads({
        contracts: [
          {
            address: '0xdaD7677997871308ab84E22C93A6231cAe0B67f3',
            abi: lotteryJson.abi,
            functionName: 'betsOpen',
          },
          {
            address: '0xdaD7677997871308ab84E22C93A6231cAe0B67f3',
            abi: lotteryJson.abi,
            functionName: 'betPrice',
          },
        ],
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
