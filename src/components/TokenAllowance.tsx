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
import { ethers, utils} from 'ethers';
import { LOTTERY_CONTRACT_ADDRESS, LOTTERY_TOKEN_ADDRESS } from "../constants/contracts";
import { metisGoerli } from 'wagmi/dist/chains';

export const TokenAllowance = () => {
    const [spender, setSpender] = React.useState("")
    const { address, isConnected, isDisconnected } = useAccount()
    const spenderHard = "0x4FAC925B7279Ad39dc4340a5158dfd049f43eD10"
    const owner = "0x4FAC925B7279Ad39dc4340a5158dfd049f43eD10"
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
        args: [owner, spenderHard],
    })
    const { data, isLoading, isSuccess, write } = useContractWrite(config)
      
    if (isConnected) {
        return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography component={'span'} variant={'body1'} align={'center'}>
                        <div>
                            <button disabled={!write} onClick={() => write?.()}>
                                Allow Tokens
                            </button>
                            {isLoading && <div>Check Wallet</div>}
                            {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
                        </div>
                        <div>
                            <input
                                id="spender"
                                onChange={(e) => setSpender(e.target.value)}
                                placeholder="Address to allow."
                                value={spender}
                            />
                        </div>
                    </Typography>
                </CardContent>
            </Card>
      );
    }
    return <div>Not Connected</div>
}
