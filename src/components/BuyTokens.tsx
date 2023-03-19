import { useAccount, useContractRead, useBalance, usePrepareContractWrite, useContractWrite,  } from 'wagmi'
import lotteryABI from '../assets/Lottery.json';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Alert, Box, Button, CircularProgress, CircularProgressClasses, TextField } from '@mui/material';

export const BuyTokens = () => {
    const { address, isConnected, isDisconnected } = useAccount();
    const { config, error } = usePrepareContractWrite({
        address: '0xdaD7677997871308ab84E22C93A6231cAe0B67f3',
        abi: lotteryABI.abi,
        functionName: 'purchaseTokens',
      })
      const { write } = useContractWrite(config)

    if (isConnected) {
        if (error) return <Alert severity="error">{error?.message}</Alert>
        return (
            <div style={{}}>
                <Card sx={{ minWidth: 275, minHeight: 100 }}>
                    <CardContent>
                        <Box
                            component="form"
                            autoComplete="off"
                            display="flex"
                            justifyContent="space-around"
                            alignItems="center"
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    margin: "4px",
                                  }}
                            >
                                <TextField id="outlined-number"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="filled"
                                />
                                <Button sx={{ marginLeft: "5px"}} variant="outlined" disabled={!write} onClick={() => write?.()}>
                                    Buy LOTO Tokens
                                </Button>
                            </div>
                        </Box>
                    </CardContent>
                </Card>
           
            </div>
        );
    }
    return <div>Wallet is not connected, please reconnect</div>
}