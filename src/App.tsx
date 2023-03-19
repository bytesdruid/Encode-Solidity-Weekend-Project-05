import { 
  Connect, 
  BetTimer, 
  UserBalanceDisplay, 
  BuyTokens, 
  Bet,  
  OpenBets,
  CloseLottery,
  ReturnTokens
} from './components/ExportComponents';
import {
  BetState,
  PaymentToken,
  PurchaseRatio,
  BetPrice,
  BetFee,
  PrizePool,
  OwnerPool,
  BetsClosingTime
} from './components/stateVarReads/ExportStateVarReads';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig, useAccount } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { infuraProvider } from 'wagmi/providers/infura';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import '@rainbow-me/rainbowkit/styles.css';
import './App.css';
import { PrizeWithdraw } from './components/PrizeWithdraw';
import { OwnerWithdraw } from './components/OwnerWithdraw';
import { TokenAllowance } from './components/TokenAllowance';

const { chains, provider } = configureChains(
  [sepolia],
  [infuraProvider({ apiKey: process.env.INFURA_API_KEY as string })]
);

const { connectors } = getDefaultWallets({
  appName: 'Lottery App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

const App = () => {
  const deployer = "0x4FAC925B7279Ad39dc4340a5158dfd049f43eD10";
  const { address, isConnected } = useAccount()
  return (
    <Container maxWidth="xl">
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Connect />
        {!isConnected ? 
        <p>Please <strong>Connect Wallet</strong> to Play</p> : 
        (
          <Grid container spacing={1}>
             TODO Components - from Hardeep
             <Grid item xs={12} >
              <BetTimer />
            </Grid>
            Token contract state variables.
            <Grid item xs={12} lg={12}>
              <UserBalanceDisplay />
            </Grid>
            Token contract methods.
            <Grid item xs={12} lg={12}>
              <TokenAllowance />
            </Grid>
            Lottery contract state variables.
            <Grid item xs={12} lg={12}>
              <BetState />
              <PaymentToken />
              <PurchaseRatio />
              <BetPrice />
              <BetFee />
              <PrizePool />
              <OwnerPool />
              <BetsClosingTime />
            </Grid>
            Lottery contract methods.
            <Grid item xs={12} lg={12}>
              <BuyTokens />
            </Grid>
            <Grid item xs={12} lg={12}>
              <OpenBets />
            </Grid>
            <Grid item xs={12} lg={12}>
              <CloseLottery />
            </Grid>
            <Grid item xs={12} lg={12}>
              <Bet />
            </Grid>
            <Grid item xs={12} lg={12}>
              <ReturnTokens />
            </Grid>
            <Grid item xs={12} lg={12}>
              <PrizeWithdraw />
            </Grid>
            <Grid item xs={12} lg={12}>
              <OwnerWithdraw />
            </Grid>
          </Grid>
        )}
      </RainbowKitProvider>
    </WagmiConfig>
    </Container>
  );
};

export default App;

