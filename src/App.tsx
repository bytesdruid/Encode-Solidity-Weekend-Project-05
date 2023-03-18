import React from 'react';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig, useAccount } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { infuraProvider } from 'wagmi/providers/infura';
import { Connect }  from './components/Connect';
import { BetTimer } from './components/BetTimer';
import { BetStatus } from './components/BetStatus';
import { BalanceDisplay } from './components/BalanceDisplay';
import { BuyTokens } from './components/BuyTokens';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import '@rainbow-me/rainbowkit/styles.css';
import './App.css';

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
             <Grid item xs={12} >
              <BetTimer />
            </Grid>
            {!(address == deployer) ? null : (
              <Grid item xs={12}>
                <BetStatus />
              </Grid>
            )}
            <Grid item xs={12} lg={6}>
              <BuyTokens />
            </Grid>
            <Grid item xs={12} lg={6}>
            <BalanceDisplay />
            </Grid>
          </Grid>
        )}
      </RainbowKitProvider>
    </WagmiConfig>
    </Container>
  );
};

export default App;
