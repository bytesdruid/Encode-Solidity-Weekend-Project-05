// * @dev See {IERC20-allowance}.
// */
// function allowance(address owner, address spender) public view virtual override returns (uint256) {
//    return _allowances[owner][spender];
// }

import React from 'react';
import { useAccount, usePrepareContractWrite, useContractWrite } from 'wagmi'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ethers} from 'ethers';
import { LOTTERY_CONTRACT_ADDRESS, LOTTERY_TOKEN_ADDRESS } from "../constants/contracts";

export const TokenAllowance = () => {
    const [closingTime, setClosingTime] = React.useState("0")
    const closingTimeNumber = ethers.utils.parseEther(closingTime)
    const { address, isConnected, isDisconnected } = useAccount()
    const { config } = usePrepareContractWrite({
        address: LOTTERY_TOKEN_ADDRESS,
        abi: [
            {
              name: 'allowance',
              type: 'function',
              stateMutability: 'nonpayable',
              inputs: [{ internalType: 'address', name: 'owner', type: 'address' }, { internalType: 'address', name: 'spender', type: 'address' }],
              outputs: [],
            },
        ],
        functionName: 'allowance',
        args: [closingTimeNumber],
    })
    const { data, isLoading, isSuccess, write } = useContractWrite(config)
      
    if (isConnected) {
        return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography component={'span'} variant={'body1'} align={'center'}>
                        <div>
                            <button disabled={!write} onClick={() => write?.()}>
                                Open Bets
                            </button>
                            {isLoading && <div>Check Wallet</div>}
                            {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
                        </div>
                        <div>
                            <input
                                id="closingBlockNumber"
                                onChange={(e) => setClosingTime(e.target.value)}
                                placeholder="Closing block number."
                                value={closingTime}
                            />
                        </div>
                    </Typography>
                </CardContent>
            </Card>
      );
    }
    return <div>Not Connected</div>
}
