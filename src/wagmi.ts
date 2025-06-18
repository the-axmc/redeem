import { http, createConfig } from "wagmi";
import { injected, valora } from "wagmi/connectors";
import { celo } from "viem/chains";

export const config = createConfig({
  chains: [celo],
  connectors: [injected(), valora({ projectId: "WALLETCONNECT_PROJECT_ID" })],
  transports: {
    [celo.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
