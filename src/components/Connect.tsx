import { padding } from '@mui/system';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useSigner } from 'wagmi'

export const Connect = () => {
  const { data: signer, isError, isLoading } = useSigner()
  console.log(`address: ${signer?.getAddress()}`);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row-reverse",
        padding: "10px"

      }}
     >
      <ConnectButton />
    </div>
  )
}