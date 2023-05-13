/*
 * @Author: hiLin 123456
 * @Date: 2023-05-12 22:19:28
 * @LastEditors: hiLin 123456
 * @LastEditTime: 2023-05-13 11:19:08
 * @FilePath: /ChatGPT-Next-Web/app/page.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

'use client';
import { Analytics } from "@vercel/analytics/react";

import { Home } from "./components/home";

import { getServerSideConfig } from "./config/server";
import {
  PlatON,
  Optimism,
  Moonbeam,
  Moonriver,
  Avalanche,
  Polygon,
  BSC,
  Ethereum,
  EthereumGoerli,
  Solana,
  BSCTestnet,
  KCCTestnet,
} from '@particle-network/common';
import { evmWallets, solanaWallets } from '@particle-network/connect';
import { ModalProvider } from '@particle-network/connect-react-ui';
import { WalletEntryPosition } from '@particle-network/auth';
import '@particle-network/connect-react-ui/esm/index.css';
import React from "react";
import {
  useAppConfig,
} from "./store";
const serverConfig = getServerSideConfig();

export default async function App(props: any) {
  const pageProps = props && props.pageProps || {}
  const config = useAppConfig();
  return (
    <>
      {/* <Home />
      {serverConfig?.isVercel && <Analytics />} */}
      <ModalProvider
            walletSort={['Particle Auth', 'Wallet']}
            particleAuthSort={[
                'email',
                'phone',
                'google',
                'apple',
                'facebook',
                'microsoft',
                'linkedin',
                'github',
                'discord',
            ]}
            options={{
                projectId: '251f346a-06ab-4cfc-9c24-d15d1ff9377e',
                clientKey: 'cfvs68x5oBupOzQYIPiZu4iN2aYhRiTMkhPNay1l',
                appId: '1b6fca0d-dfdf-446b-bea6-81fd67d4213f',
                chains: [
                    PlatON,
                    Optimism,
                    Moonbeam,
                    Moonriver,
                    Avalanche,
                    Polygon,
                    BSC,
                    Ethereum,
                    EthereumGoerli,
                    Solana,
                    BSCTestnet,
                    KCCTestnet,
                ],
                particleWalletEntry: {
                    displayWalletEntry: true,
                    defaultWalletEntryPosition: WalletEntryPosition.BR,
                    supportChains: [Ethereum, EthereumGoerli],
                },
                wallets: [...evmWallets({ qrcode: false }), ...solanaWallets()],
            }}
            language="en"
            theme={config.theme}
        >
            <Home {...pageProps} />
            {serverConfig?.isVercel && <Analytics />}
        </ModalProvider>
    </>
  );
}
