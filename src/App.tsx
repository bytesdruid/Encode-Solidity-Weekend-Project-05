import {
  Connect,
  UserBalanceDisplay,
  BuyTokens,
  Bet,
  OpenBets,
  CloseLottery,
  BetTimer,
  ReturnTokens,
} from './components/ExportComponents';
import {
  BetState,
  PaymentToken,
  PurchaseRatio,
  BetPrice,
  BetFee,
  PrizePool,
  OwnerPool,
  BetsClosingTime,
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
import FadeCard from './components/FadeCard';

const { chains, provider } = configureChains(
  [sepolia],
  [infuraProvider({ apiKey: process.env.INFURA_API_KEY as string })]
);

const { connectors } = getDefaultWallets({
  appName: 'Lottery App',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const App = () => {
  const deployer = '0x4FAC925B7279Ad39dc4340a5158dfd049f43eD10';
  const { address, isConnected } = useAccount();
  return (
    <Container maxWidth='xl' style={{ margin: '1rem auto 5rem auto' }}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
        <div className='lottery-title-container'>
          <h1 className='lottery-title'>Lottery dApp</h1>
          <Connect />
        </div>
          {!isConnected ? (
            <p>
              Please <strong>Connect Wallet</strong> to Play
            </p>
          ) : (
            <>
              <Grid container spacing={1}>
                <div className='section-title'>
                  Token contract state variables.
                </div>
                <Grid item xs={12} lg={12}>
                  <UserBalanceDisplay />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <BetTimer />
                </Grid>
                <div className='section-title'>
                  Lottery contract state variables.
                </div>
                <Grid item xs={12} lg={12}>
                  <div style={{}}>
                    <BetState />
                    <PaymentToken />
                  </div>
                  <div className={'lotto-details'}>
                    <PurchaseRatio />
                    <BetPrice />
                    <BetFee />
                    <PrizePool />
                    <OwnerPool />
                    <BetsClosingTime />
                  </div>
                </Grid>
              </Grid>
              <div className='section-title'>Lottery contract methods.</div>
              <Grid container columns={12} spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <FadeCard>
                    <BuyTokens />
                  </FadeCard>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <FadeCard>
                    <OpenBets />
                  </FadeCard>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <FadeCard>
                    <Bet />
                  </FadeCard>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <FadeCard>
                    <CloseLottery />
                  </FadeCard>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <FadeCard>
                    <PrizeWithdraw />
                  </FadeCard>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <FadeCard>
                    <OwnerWithdraw />
                  </FadeCard>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <FadeCard>
                    <ReturnTokens />
                  </FadeCard>
                </Grid>
              </Grid>
            </>
          )}
        </RainbowKitProvider>
      </WagmiConfig>
    </Container>
  );
};

export default App;
