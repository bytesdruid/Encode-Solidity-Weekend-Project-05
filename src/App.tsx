import React from 'react';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig, useSigner } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { infuraProvider } from 'wagmi/providers/infura';
import { Connect }  from './components/Connect';
import { OpenBet } from './components/OpenBet';
import { CloseBet } from './components/CloseBet';
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
  return (
    <Container maxWidth="xl">
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Connect />
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <OpenBet />
          </Grid>
          <Grid item xs={12} lg={6}>
            <CloseBet />
          </Grid>
          <Grid item xs={12} lg={6}>
            <CloseBet />
          </Grid>
        </Grid>
      </RainbowKitProvider>
    </WagmiConfig>
    </Container>
  );
};

export default App;
