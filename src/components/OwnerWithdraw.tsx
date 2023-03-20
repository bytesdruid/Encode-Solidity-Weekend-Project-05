import React from 'react';
import { BigNumber, ethers } from 'ethers';
import { useAccount, usePrepareContractWrite, useContractWrite } from 'wagmi';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { LOTTERY_CONTRACT_ADDRESS, LOTTERY_ABI } from '../constants/contracts';

export const OwnerWithdraw = () => {
  const [amount, setAmount] = React.useState('0');
  const { address, isConnected, isDisconnected } = useAccount();
  const BnAmount =
    parseInt(amount) > 0
      ? ethers.BigNumber.from(amount)
      : ethers.BigNumber.from('0');
  const { config } = usePrepareContractWrite({
    address: LOTTERY_CONTRACT_ADDRESS,
    abi: [
      {
        name: 'ownerWithdraw',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
        outputs: [],
      },
    ],
    functionName: 'ownerWithdraw',
    args: [BnAmount],
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const ownerWithdrawHandler = () => {
    if (parseInt(amount) > 0) write?.();
    else alert('Please enter an amount greater than 0');
  };

  if (isConnected) {
    return (
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography component={'span'} variant={'body1'} align={'center'}>
            <div>
              <button disabled={!write} onClick={ownerWithdrawHandler}>
                Owner Withdraw
              </button>
              {isLoading && <div>Check Wallet</div>}
              {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
            </div>
            <div>
              <input
                id='amount'
                onChange={(e) => setAmount(e.target.value)}
                placeholder='Amount of prize to withdraw.'
                value={amount}
              />
            </div>
          </Typography>
        </CardContent>
      </Card>
    );
  }
  return <div>Not Connected</div>;
};
