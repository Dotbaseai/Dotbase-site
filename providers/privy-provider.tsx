'use client'; // Add this at the top to mark as Client Component

import { PrivyProvider } from '@privy-io/react-auth';
import { ReactNode } from 'react';
import { toSolanaWalletConnectors } from '@privy-io/react-auth/solana';

export function Providers({ children }: { children: ReactNode }) {
  const solanaConnectors = toSolanaWalletConnectors({
    shouldAutoConnect: false,
  });

  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
      config={{
        appearance: {
          accentColor: "#6A6FF5",
          theme: "#FFFFFF",
          showWalletLoginFirst: false,
          logo: "https://auth.privy.io/logos/privy-logo.png",
          walletChainType: 'solana-only',
          walletList: ['phantom']
        },
        externalWallets: {
          solana: {
            connectors: solanaConnectors
          },
        },
        loginMethods: [
          'email',
          'wallet'
        ],
        embeddedWallets: {
          createOnLogin: 'all-users',
          requireUserPasswordOnCreate: false,
          showWalletUIs: true
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}