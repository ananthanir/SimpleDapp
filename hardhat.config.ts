import hardhatToolboxViemPlugin from "@nomicfoundation/hardhat-toolbox-viem";
import { configVariable, defineConfig } from "hardhat/config";

export default defineConfig({
  plugins: [hardhatToolboxViemPlugin],
  solidity: {
    profiles: {
      default: {
        version: "0.8.28",
      },
      production: {
        version: "0.8.28",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    },
  },
  networks: {
    hardhat: {
      type: "edr-simulated",
      chainType: "l1",
      accounts: {
        mnemonic: "zero boil enrich wasp dad address pause announce artwork dizzy soft vacuum",
        count: 2,
        accountsBalance: 900000n * 10n ** 18n, // 900,000 ETH in wei
      },
    },
    localhost: {
      type: "http",
      url: "http://127.0.0.1:8546",
    },
  },
});
