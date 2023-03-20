import React from 'react';
import { BigNumber, ethers } from 'ethers';
import { useAccount, usePrepareContractWrite, useContractWrite } from 'wagmi';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { LOTTERY_CONTRACT_ADDRESS, LOTTERY_ABI } from '../constants/contracts';
import { Button, TextField } from '@mui/material';

export const PrizeWithdraw = () => {
  const [amount, setAmount] = React.useState('0');
  const { address, isConnected, isDisconnected } = useAccount();
  const BnAmount =
    parseInt(amount) > 0
      ? ethers.utils.parseEther(amount)
      : ethers.utils.parseEther('0');
  const { config } = usePrepareContractWrite({
    address: LOTTERY_CONTRACT_ADDRESS,
    abi: [
      {
        name: 'prizeWithdraw',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
        outputs: [],
      },
    ],
    functionName: 'prizeWithdraw',
    args: [BnAmount],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const prizeWithdrawHandler = () => {
    if (parseInt(amount) > 0) write?.();
    else alert('Please enter an amount greater than 0');
  };

  if (isConnected) {
    return (
      <Card sx={{ minWidth: 275, minHeight: 90 }}>
        <CardContent>
          <Typography component={'span'} variant={'body1'} align={'center'}>
            <div>
              <TextField
                id='amount'
                type="number"
                size="small"
                placeholder="enter token amount"
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                />
                <Button variant="contained" disabled={!write} onClick={prizeWithdrawHandler}>
                Prize Withdraw
              </Button>
              {isLoading && <div>Check Wallet</div>}
              {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
            </div>
          </Typography>
        </CardContent>
      </Card>
    );
  }
  return <div>Not Connected</div>;
};
