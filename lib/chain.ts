import { defineChain } from "viem";
import { anvil } from "viem/chains";

export const anvilSonic = defineChain({
  ...anvil,
  id: 146,
  nativeCurrency: { decimals: 18, name: "Sonic", symbol: "S" },
});
