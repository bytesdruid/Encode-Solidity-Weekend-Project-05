import { padding } from '@mui/system';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useSigner } from 'wagmi'

export const Connect = () => {
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