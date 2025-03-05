import { defineChain } from "viem";
import { anvil } from "viem/chains";

export const anvilSonic = defineChain({
  ...anvil,
  rpcUrls: {
    default: {
      http: ["https://anvil.shiami.me"],
    },
  },
  id: 146,
  nativeCurrency: { decimals: 18, name: "Sonic", symbol: "S" },
});
