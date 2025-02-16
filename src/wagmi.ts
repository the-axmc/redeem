import { http, createConfig } from "wagmi";
import { injected } from "wagmi/connectors";
import { celo } from "viem/chains";

export const config = createConfig({
  chains: [celo],
  connectors: [injected()],
  transports: {
    [celo.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
