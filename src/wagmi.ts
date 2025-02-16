import { http, createConfig } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { defineChain } from 'viem'

export const arthera = defineChain({
  id: 10242,
  name: 'Arthera',
  nativeCurrency: { name: 'AA', symbol: 'AA', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.arthera.net'] },
  },
  blockExplorers: {
    default: { name: 'Blockscout', url: 'https://explorer.arthera.net' },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 4502791,
    },
  },
})

export const artheraTestnet = defineChain({
  id: 10243,
  name: 'artheraTestnet',
  nativeCurrency: { name: 'AA', symbol: 'AA', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc-test.arthera.net'] },
  },
  blockExplorers: {
    default: { name: 'Blockscout', url: 'https://explorer-test.arthera.net' },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 4502791,
    },
  },
})

export const config = createConfig({
  chains: [arthera, artheraTestnet],
  connectors: [
    injected(),
  ],
  transports: {
    [arthera.id]: http(),
    [artheraTestnet.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
