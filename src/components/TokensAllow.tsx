// * @dev See {IERC20-allowance}.
// */
// function allowance(address owner, address spender) public view virtual override returns (uint256) {
//    return _allowances[owner][spender];
// }

// function approve(address spender, uint256 amount) public virtual override returns (bool) {
//     address owner = _msgSender();
//     _approve(owner, spender, amount);
//     return true;
// }

import React from 'react';
import { useAccount, usePrepareContractWrite, useContractWrite } from 'wagmi'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ethers, utils} from 'ethers';
import { LOTTERY_CONTRACT_ADDRESS, LOTTERY_TOKEN_ADDRESS } from "../constants/contracts";
import { metisGoerli } from 'wagmi/dist/chains';

export const AllowTokens = () => {
    // const [spender, setSpender] = React.useState("")
    const { address, isConnected, isDisconnected } = useAccount()
    // const spender = LOTTERY_CONTRACT_ADDRESS
    const owner = LOTTERY_TOKEN_ADDRESS
    const spender = "0x6480041a72581F67eb45FD2F23DA8Af291641f2c"
    const { config } = usePrepareContractWrite({
        address: LOTTERY_TOKEN_ADDRESS,
        abi: [
            {
              name: 'allowance',
              type: 'function',
              stateMutability: 'nonpayable',
              inputs: [{ internalType: 'address', name: 'owner', type: 'address' }, { internalType: 'address', name: 'spender', type: 'address' }],
              outputs: [],
              onError(error: any) {
                console.log('Error', error)
              },
            },
        ],
        functionName: 'allowance',
        args: [owner, spender],
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
                            {/* <input
                                id="spender"
                                onChange={(e) => setSpender(e.target.value)}
                                placeholder="Address to allow."
                                value={spender}
                            /> */}
                        </div>
                    </Typography>
                </CardContent>
            </Card>
      );
    }
    return <div>Not Connected</div>
}