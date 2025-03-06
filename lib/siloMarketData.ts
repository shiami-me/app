// This file contains the hardcoded market data
// The dynamic values (liquidity, collateralBaseApr, debtBaseApr, maxLtv, lt) will be updated using SiloLens

export const siloMarketData = [
  {
      "protocolKey": "sonic",
      "id": "3",
      "isVerified": true,
      "configAddress": "0x78C246f67c8A6cE03a1d894d4Cf68004Bd55Deea",
      "boostedContentKey": null,
      "silo0": {
          "tokenAddress": "0xE5DA20F15420aD15DE0fa650600aFc998bbE3955",
          "symbol": "stS",
          "name": "Beets Staked Sonic",
          "logos": {
              "trustWallet": null,
              "coinMarketCap": null,
              "coinGecko": {
                  "small": "https://coin-images.coingecko.com/coins/images/52937/small/token-beets-staked-sonic.png?1734712659",
                  "large": "https://coin-images.coingecko.com/coins/images/52937/large/token-beets-staked-sonic.png?1734712659"
              }
          },
          "decimals": 18,
          "priceUsd": "604415",
          "maxLtv": "950000000000000000",
          "lt": "970000000000000000",
          "solvencyOracle": {
              "address": "0xBDc15b6aaC4e7b4685A2d199bBfa8876730982F2",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "maxLtvOracle": {
              "address": "0xBDc15b6aaC4e7b4685A2d199bBfa8876730982F2",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "collateralBaseApr": "19657462893562809",
          "collateralPrograms": [],
          "protectedPrograms": [],
          "debtBaseApr": "37593637751088000",
          "debtPrograms": [],
          "liquidity": "52531578823059992533272579",
          "tvl": "136531955068633349688880062",
          "isNonBorrowable": false,
          "collateralPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 8
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "protectedPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 8
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "debtPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 0.5,
                  "multiplier": 1
              }
          ],
          "oracleLabel": "RedStone",
          "oracleContentKey": "sonic-sts-s-3"
      },
      "silo1": {
          "tokenAddress": "0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38",
          "symbol": "S",
          "name": "Sonic",
          "logos": {
              "trustWallet": null,
              "coinMarketCap": null,
              "coinGecko": {
                  "small": "https://coin-images.coingecko.com/coins/images/52857/small/wrapped_sonic.png?1734536585",
                  "large": "https://coin-images.coingecko.com/coins/images/52857/large/wrapped_sonic.png?1734536585"
              }
          },
          "decimals": 18,
          "priceUsd": "597238",
          "maxLtv": "950000000000000000",
          "lt": "970000000000000000",
          "solvencyOracle": {
              "address": "0x0000000000000000000000000000000000000000",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "maxLtvOracle": {
              "address": "0x0000000000000000000000000000000000000000",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "collateralBaseApr": "40892759532841865",
          "collateralPrograms": [],
          "protectedPrograms": [],
          "debtBaseApr": "54221788048320000",
          "debtPrograms": [],
          "liquidity": "16475201505828749337031090",
          "tvl": "146145235122007855190612741",
          "isNonBorrowable": false,
          "collateralPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 8
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 2
              }
          ],
          "protectedPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 8
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 2
              }
          ],
          "debtPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 0.5,
                  "multiplier": 1
              }
          ],
          "oracleLabel": "RedStone",
          "oracleContentKey": "sonic-sts-s-3"
      }
  },
  {
      "protocolKey": "sonic",
      "id": "20",
      "isVerified": true,
      "configAddress": "0x062A36Bbe0306c2Fd7aecdf25843291fBAB96AD2",
      "boostedContentKey": null,
      "silo0": {
          "tokenAddress": "0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38",
          "symbol": "S",
          "name": "Sonic",
          "logos": {
              "trustWallet": null,
              "coinMarketCap": null,
              "coinGecko": {
                  "small": "https://coin-images.coingecko.com/coins/images/52857/small/wrapped_sonic.png?1734536585",
                  "large": "https://coin-images.coingecko.com/coins/images/52857/large/wrapped_sonic.png?1734536585"
              }
          },
          "decimals": 18,
          "priceUsd": "597238",
          "maxLtv": "750000000000000000",
          "lt": "800000000000000000",
          "solvencyOracle": {
              "address": "0x5dA3510D19059394DAf8A5C0f50B0f6aBea9F4C5",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "maxLtvOracle": {
              "address": "0x5dA3510D19059394DAf8A5C0f50B0f6aBea9F4C5",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "collateralBaseApr": "25337939261187153",
          "collateralPrograms": [
              {
                  "rewardTokenSymbol": "SILO",
                  "apr": "10403350636006079"
              }
          ],
          "protectedPrograms": [],
          "debtBaseApr": "60360280539840000",
          "debtPrograms": [],
          "liquidity": "14725424344425791254048300",
          "tvl": "29264423560853076098493645",
          "isNonBorrowable": false,
          "collateralPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 8
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 2
              }
          ],
          "protectedPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 8
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 2
              }
          ],
          "debtPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 0.5,
                  "multiplier": 1
              }
          ],
          "oracleLabel": "Chainlink",
          "oracleContentKey": "sonic-8-s"
      },
      "silo1": {
          "tokenAddress": "0x29219dd400f2Bf60E5a23d13Be72B486D4038894",
          "symbol": "USDC",
          "name": "Bridged USDC (Sonic Labs)",
          "logos": {
              "trustWallet": null,
              "coinMarketCap": null,
              "coinGecko": {
                  "small": "https://coin-images.coingecko.com/coins/images/53064/small/logo.png?1735179479",
                  "large": "https://coin-images.coingecko.com/coins/images/53064/large/logo.png?1735179479"
              }
          },
          "decimals": 6,
          "priceUsd": "999933",
          "maxLtv": "750000000000000000",
          "lt": "800000000000000000",
          "solvencyOracle": {
              "address": "0x688951Ad1FAfb55484Fd4a3f867aacA88B0Bfa4c",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "maxLtvOracle": {
              "address": "0x688951Ad1FAfb55484Fd4a3f867aacA88B0Bfa4c",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "collateralBaseApr": "37710114830169317",
          "collateralPrograms": [
              {
                  "rewardTokenSymbol": "S",
                  "apr": "62598760793577320"
              },
              {
                  "rewardTokenSymbol": "SILO",
                  "apr": "3116612859427233"
              }
          ],
          "protectedPrograms": [],
          "debtBaseApr": "81273803256720000",
          "debtPrograms": [],
          "liquidity": "39512445301608",
          "tvl": "87028412934538",
          "isNonBorrowable": false,
          "collateralPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 10
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "protectedPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 10
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "debtPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 0.5,
                  "multiplier": 1
              }
          ],
          "oracleLabel": "Chainlink",
          "oracleContentKey": "sonic-usdc-chainlink"
      }
  },
  {
      "protocolKey": "sonic",
      "id": "8",
      "isVerified": true,
      "configAddress": "0x4915F6d3C9a7B20CedFc5d3854f2802f30311d13",
      "boostedContentKey": null,
      "silo0": {
          "tokenAddress": "0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38",
          "symbol": "S",
          "name": "Sonic",
          "logos": {
              "trustWallet": null,
              "coinMarketCap": null,
              "coinGecko": {
                  "small": "https://coin-images.coingecko.com/coins/images/52857/small/wrapped_sonic.png?1734536585",
                  "large": "https://coin-images.coingecko.com/coins/images/52857/large/wrapped_sonic.png?1734536585"
              }
          },
          "decimals": 18,
          "priceUsd": "597238",
          "maxLtv": "750000000000000000",
          "lt": "800000000000000000",
          "solvencyOracle": {
              "address": "0x7bd2a4820abf7F8708c0ce57a03e615956bF2f3A",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "maxLtvOracle": {
              "address": "0x7bd2a4820abf7F8708c0ce57a03e615956bF2f3A",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "collateralBaseApr": "0",
          "collateralPrograms": [],
          "protectedPrograms": [],
          "debtBaseApr": "31536000",
          "debtPrograms": [],
          "liquidity": "1000000000000000000",
          "tvl": "81736367330612374491025678",
          "isNonBorrowable": true,
          "collateralPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 8
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "protectedPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 8
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "debtPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 0.5,
                  "multiplier": 1
              }
          ],
          "oracleLabel": "Chainlink",
          "oracleContentKey": "sonic-8-s"
      },
      "silo1": {
          "tokenAddress": "0x29219dd400f2Bf60E5a23d13Be72B486D4038894",
          "symbol": "USDC",
          "name": "Bridged USDC (Sonic Labs)",
          "logos": {
              "trustWallet": null,
              "coinMarketCap": null,
              "coinGecko": {
                  "small": "https://coin-images.coingecko.com/coins/images/53064/small/logo.png?1735179479",
                  "large": "https://coin-images.coingecko.com/coins/images/53064/large/logo.png?1735179479"
              }
          },
          "decimals": 6,
          "priceUsd": "999933",
          "maxLtv": "0",
          "lt": "0",
          "solvencyOracle": {
              "address": "0x44bd4BfD2a361EAa7D905935Cc59D8849639C77D",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "maxLtvOracle": {
              "address": "0x44bd4BfD2a361EAa7D905935Cc59D8849639C77D",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "collateralBaseApr": "56522875002530599",
          "collateralPrograms": [
              {
                  "rewardTokenSymbol": "S",
                  "apr": "40826884056660507"
              },
              {
                  "rewardTokenSymbol": "SILO",
                  "apr": "8777187395415707"
              }
          ],
          "protectedPrograms": [],
          "debtBaseApr": "96699000377232000",
          "debtPrograms": [],
          "liquidity": "10829393220844",
          "tvl": "30902850275381",
          "isNonBorrowable": false,
          "collateralPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 10
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "protectedPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 10
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "debtPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 0.5,
                  "multiplier": 2
              }
          ],
          "oracleLabel": "Chainlink",
          "oracleContentKey": "sonic-usdc-chainlink"
      }
  },
  {
      "protocolKey": "sonic",
      "id": "22",
      "isVerified": true,
      "configAddress": "0x1A030F39a8cf9f0b2649e97cF6d0C7853AeaCf78",
      "boostedContentKey": null,
      "silo0": {
          "tokenAddress": "0x9F0dF7799f6FDAd409300080cfF680f5A23df4b1",
          "symbol": "wOS",
          "name": "Wrapped OS",
          "logos": {
              "trustWallet": null,
              "coinMarketCap": null,
              "coinGecko": {
                  "small": "https://coin-images.coingecko.com/coins/images/53774/small/wos-256x256.png?1737271865",
                  "large": "https://coin-images.coingecko.com/coins/images/53774/large/wos-256x256.png?1737271865"
              }
          },
          "decimals": 18,
          "priceUsd": "596294",
          "maxLtv": "900000000000000000",
          "lt": "950000000000000000",
          "solvencyOracle": {
              "address": "0xa2b8895817009054a12a2Ae41256E9FD39B5FF67",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "maxLtvOracle": {
              "address": "0xa2b8895817009054a12a2Ae41256E9FD39B5FF67",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "collateralBaseApr": "0",
          "collateralPrograms": [],
          "protectedPrograms": [],
          "debtBaseApr": "31536000",
          "debtPrograms": [],
          "liquidity": "1077191980621512581930525",
          "tvl": "10290073200407807011341900",
          "isNonBorrowable": true,
          "collateralPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 8
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "protectedPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 8
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "debtPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 0.5,
                  "multiplier": 1
              }
          ],
          "oracleLabel": "Custom oracle",
          "oracleContentKey": "sonic-22-wos"
      },
      "silo1": {
          "tokenAddress": "0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38",
          "symbol": "S",
          "name": "Sonic",
          "logos": {
              "trustWallet": null,
              "coinMarketCap": null,
              "coinGecko": {
                  "small": "https://coin-images.coingecko.com/coins/images/52857/small/wrapped_sonic.png?1734536585",
                  "large": "https://coin-images.coingecko.com/coins/images/52857/large/wrapped_sonic.png?1734536585"
              }
          },
          "decimals": 18,
          "priceUsd": "597238",
          "maxLtv": "0",
          "lt": "0",
          "solvencyOracle": {
              "address": "0x0000000000000000000000000000000000000000",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "maxLtvOracle": {
              "address": "0x0000000000000000000000000000000000000000",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "collateralBaseApr": "30357766740607758",
          "collateralPrograms": [
              {
                  "rewardTokenSymbol": "SILO",
                  "apr": "21906685481317296"
              },
              {
                  "rewardTokenSymbol": "wOS",
                  "apr": "18185519831935083"
              }
          ],
          "protectedPrograms": [],
          "debtBaseApr": "67259961342288000",
          "debtPrograms": [],
          "liquidity": "7251481171781501643452521",
          "tvl": "15470620623987330407510160",
          "isNonBorrowable": false,
          "collateralPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 8
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 2
              }
          ],
          "protectedPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 8
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 2
              }
          ],
          "debtPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 0.5,
                  "multiplier": 1
              }
          ],
          "oracleLabel": null,
          "oracleContentKey": "sonic-22-s"
      }
  },
  {
      "protocolKey": "sonic",
      "id": "25",
      "isVerified": true,
      "configAddress": "0x6BdF0D12d4B534d5F46c53a90ddDFBe6C0e85dC7",
      "boostedContentKey": null,
      "silo0": {
          "tokenAddress": "0xfA85Fe5A8F5560e9039C04f2b0a90dE1415aBD70",
          "symbol": "wanS",
          "name": "Wrapped anS",
          "logos": {
              "trustWallet": null,
              "coinMarketCap": null,
              "coinGecko": null
          },
          "decimals": 18,
          "priceUsd": "601594",
          "maxLtv": "900000000000000000",
          "lt": "950000000000000000",
          "solvencyOracle": {
              "address": "0x7Fa198e15b697dEB4589F4C688B6B0653aBb1ddb",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "maxLtvOracle": {
              "address": "0x7Fa198e15b697dEB4589F4C688B6B0653aBb1ddb",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "collateralBaseApr": "0",
          "collateralPrograms": [],
          "protectedPrograms": [],
          "debtBaseApr": "31536000",
          "debtPrograms": [],
          "liquidity": "0",
          "tvl": "3161016051146763604143514",
          "isNonBorrowable": true,
          "collateralPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 8
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "protectedPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 8
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "debtPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 0.5,
                  "multiplier": 1
              }
          ],
          "oracleLabel": "Custom oracle",
          "oracleContentKey": "sonic-25-wans"
      },
      "silo1": {
          "tokenAddress": "0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38",
          "symbol": "S",
          "name": "Sonic",
          "logos": {
              "trustWallet": null,
              "coinMarketCap": null,
              "coinGecko": {
                  "small": "https://coin-images.coingecko.com/coins/images/52857/small/wrapped_sonic.png?1734536585",
                  "large": "https://coin-images.coingecko.com/coins/images/52857/large/wrapped_sonic.png?1734536585"
              }
          },
          "decimals": 18,
          "priceUsd": "597238",
          "maxLtv": "0",
          "lt": "0",
          "solvencyOracle": {
              "address": "0x0000000000000000000000000000000000000000",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "maxLtvOracle": {
              "address": "0x0000000000000000000000000000000000000000",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "collateralBaseApr": "1174888565415814",
          "collateralPrograms": [],
          "protectedPrograms": [],
          "debtBaseApr": "9190707752016000",
          "debtPrograms": [],
          "liquidity": "15119487178559902327781625",
          "tvl": "17795868445280601570991099",
          "isNonBorrowable": false,
          "collateralPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 8
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 2
              }
          ],
          "protectedPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 8
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 2
              }
          ],
          "debtPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 0.5,
                  "multiplier": 1
              }
          ],
          "oracleLabel": null,
          "oracleContentKey": "sonic-25-s"
      }
  },
  {
      "protocolKey": "sonic",
      "id": "23",
      "isVerified": true,
      "configAddress": "0xbC24c0F594ECA381956895957c771437D61400D3",
      "boostedContentKey": null,
      "silo0": {
          "tokenAddress": "0x9fb76f7ce5FCeAA2C42887ff441D46095E494206",
          "symbol": "wstkscUSD",
          "name": "Wrapped stkscUSD",
          "logos": {
              "trustWallet": null,
              "coinMarketCap": null,
              "coinGecko": null
          },
          "decimals": 6,
          "priceUsd": "999933",
          "maxLtv": "900000000000000000",
          "lt": "950000000000000000",
          "solvencyOracle": {
              "address": "0x7B4dEeb8CAa661247bD2d6a1295e4EeFA96Fd950",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "maxLtvOracle": {
              "address": "0x7B4dEeb8CAa661247bD2d6a1295e4EeFA96Fd950",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "collateralBaseApr": "0",
          "collateralPrograms": [],
          "protectedPrograms": [],
          "debtBaseApr": "31536000",
          "debtPrograms": [],
          "liquidity": "0",
          "tvl": "4318867127131",
          "isNonBorrowable": true,
          "collateralPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 12
              },
              {
                  "_tag": "rings",
                  "multiplier": 2
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "protectedPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 12
              },
              {
                  "_tag": "rings",
                  "multiplier": 2
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "debtPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 0.5,
                  "multiplier": 1
              }
          ],
          "oracleLabel": "Pyth + RedStone",
          "oracleContentKey": "sonic-23-wstkscUsd"
      },
      "silo1": {
          "tokenAddress": "0x29219dd400f2Bf60E5a23d13Be72B486D4038894",
          "symbol": "USDC",
          "name": "Bridged USDC (Sonic Labs)",
          "logos": {
              "trustWallet": null,
              "coinMarketCap": null,
              "coinGecko": {
                  "small": "https://coin-images.coingecko.com/coins/images/53064/small/logo.png?1735179479",
                  "large": "https://coin-images.coingecko.com/coins/images/53064/large/logo.png?1735179479"
              }
          },
          "decimals": 6,
          "priceUsd": "999933",
          "maxLtv": "0",
          "lt": "0",
          "solvencyOracle": {
              "address": "0x505A09c978B94Ba6ad3F90c31Ee3e1028C398631",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "maxLtvOracle": {
              "address": "0x505A09c978B94Ba6ad3F90c31Ee3e1028C398631",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "collateralBaseApr": "36824527853372054",
          "collateralPrograms": [
              {
                  "rewardTokenSymbol": "SILO",
                  "apr": "83152628712803895"
              }
          ],
          "protectedPrograms": [],
          "debtBaseApr": "78050971802880000",
          "debtPrograms": [],
          "liquidity": "2873691740174",
          "tvl": "6041132447566",
          "isNonBorrowable": false,
          "collateralPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 10
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 3
              }
          ],
          "protectedPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 10
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 3
              }
          ],
          "debtPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 0.5,
                  "multiplier": 1
              }
          ],
          "oracleLabel": "RedStone",
          "oracleContentKey": "sonic-23-usdc"
      }
  },
  {
      "protocolKey": "sonic",
      "id": "27",
      "isVerified": true,
      "configAddress": "0xaaF2F78f5eA77bF4EA150E869C54eEb73185a3BF",
      "boostedContentKey": null,
      "silo0": {
          "tokenAddress": "0x79bbF4508B1391af3A0F4B30bb5FC4aa9ab0E07C",
          "symbol": "Anon",
          "name": "HeyAnon",
          "logos": {
              "trustWallet": null,
              "coinMarketCap": null,
              "coinGecko": {
                  "small": "https://coin-images.coingecko.com/coins/images/52961/small/AAI__ANON_SQ_Wb_250x250.png?1740500195",
                  "large": "https://coin-images.coingecko.com/coins/images/52961/large/AAI__ANON_SQ_Wb_250x250.png?1740500195"
              }
          },
          "decimals": 18,
          "priceUsd": "7109240",
          "maxLtv": "550000000000000000",
          "lt": "650000000000000000",
          "solvencyOracle": {
              "address": "0xE764d83193828b7f773b5cB2a04CDd4A0c155ee7",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "maxLtvOracle": {
              "address": "0xE764d83193828b7f773b5cB2a04CDd4A0c155ee7",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "collateralBaseApr": "0",
          "collateralPrograms": [],
          "protectedPrograms": [],
          "debtBaseApr": "31536000",
          "debtPrograms": [],
          "liquidity": "1",
          "tvl": "590187974402231366943576",
          "isNonBorrowable": true,
          "collateralPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "protectedPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "debtPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 0.5,
                  "multiplier": 1
              }
          ],
          "oracleLabel": "Pyth",
          "oracleContentKey": "sonic-27-ANON"
      },
      "silo1": {
          "tokenAddress": "0x29219dd400f2Bf60E5a23d13Be72B486D4038894",
          "symbol": "USDC",
          "name": "Bridged USDC (Sonic Labs)",
          "logos": {
              "trustWallet": null,
              "coinMarketCap": null,
              "coinGecko": {
                  "small": "https://coin-images.coingecko.com/coins/images/53064/small/logo.png?1735179479",
                  "large": "https://coin-images.coingecko.com/coins/images/53064/large/logo.png?1735179479"
              }
          },
          "decimals": 6,
          "priceUsd": "999933",
          "maxLtv": "550000000000000000",
          "lt": "650000000000000000",
          "solvencyOracle": {
              "address": "0xA8FAcc4c42522A67FcD2d9Bc1b9f849ca99C34E6",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "maxLtvOracle": {
              "address": "0xA8FAcc4c42522A67FcD2d9Bc1b9f849ca99C34E6",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "collateralBaseApr": "152826233388835107",
          "collateralPrograms": [],
          "protectedPrograms": [],
          "debtBaseApr": "243786623323104000",
          "debtPrograms": [],
          "liquidity": "222059790791",
          "tvl": "1026185295762",
          "isNonBorrowable": false,
          "collateralPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 10
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "protectedPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 10
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "debtPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 0.5,
                  "multiplier": 1
              }
          ],
          "oracleLabel": "Pyth",
          "oracleContentKey": "sonic-27-USDC"
      }
  },
  {
      "protocolKey": "sonic",
      "id": "15",
      "isVerified": true,
      "configAddress": "0xFe514E71F0933F63B374056557AED3dBB381C646",
      "boostedContentKey": null,
      "silo0": {
          "tokenAddress": "0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38",
          "symbol": "S",
          "name": "Sonic",
          "logos": {
              "trustWallet": null,
              "coinMarketCap": null,
              "coinGecko": {
                  "small": "https://coin-images.coingecko.com/coins/images/52857/small/wrapped_sonic.png?1734536585",
                  "large": "https://coin-images.coingecko.com/coins/images/52857/large/wrapped_sonic.png?1734536585"
              }
          },
          "decimals": 18,
          "priceUsd": "597238",
          "maxLtv": "750000000000000000",
          "lt": "800000000000000000",
          "solvencyOracle": {
              "address": "0x5dA3510D19059394DAf8A5C0f50B0f6aBea9F4C5",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "maxLtvOracle": {
              "address": "0x5dA3510D19059394DAf8A5C0f50B0f6aBea9F4C5",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "collateralBaseApr": "5052392656230604",
          "collateralPrograms": [],
          "protectedPrograms": [],
          "debtBaseApr": "16484092240896000",
          "debtPrograms": [],
          "liquidity": "634457959829155922905428",
          "tvl": "1164225595378049927215771",
          "isNonBorrowable": false,
          "collateralPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 8
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "protectedPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 8
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "debtPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 0.5,
                  "multiplier": 2
              }
          ],
          "oracleLabel": "Chainlink",
          "oracleContentKey": "sonic-15-s"
      },
      "silo1": {
          "tokenAddress": "0xd3DCe716f3eF535C5Ff8d041c1A41C3bd89b97aE",
          "symbol": "scUSD",
          "name": "Sonic USD",
          "logos": {
              "trustWallet": null,
              "coinMarketCap": null,
              "coinGecko": {
                  "small": "https://coin-images.coingecko.com/coins/images/53456/small/scusd_%281%29.png?1736404738",
                  "large": "https://coin-images.coingecko.com/coins/images/53456/large/scusd_%281%29.png?1736404738"
              }
          },
          "decimals": 6,
          "priceUsd": "999933",
          "maxLtv": "700000000000000000",
          "lt": "750000000000000000",
          "solvencyOracle": {
              "address": "0xe809B55E3f67B1F808dF6131ee2D23525D6d350e",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "maxLtvOracle": {
              "address": "0xe809B55E3f67B1F808dF6131ee2D23525D6d350e",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "collateralBaseApr": "27205524467987522",
          "collateralPrograms": [],
          "protectedPrograms": [],
          "debtBaseApr": "67993820681760000",
          "debtPrograms": [],
          "liquidity": "820021557850",
          "tvl": "1549434510861",
          "isNonBorrowable": false,
          "collateralPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 12
              },
              {
                  "_tag": "rings",
                  "multiplier": 1.5
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "protectedPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 12
              },
              {
                  "_tag": "rings",
                  "multiplier": 1.5
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "debtPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 0.5,
                  "multiplier": 2
              }
          ],
          "oracleLabel": "RedStone",
          "oracleContentKey": "sonic-15-scusd"
      }
  },
  {
      "protocolKey": "sonic",
      "id": "9",
      "isVerified": true,
      "configAddress": "0x9603Af53dC37F4BB6386f358A51a04fA8f599101",
      "boostedContentKey": null,
      "silo0": {
          "tokenAddress": "0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38",
          "symbol": "S",
          "name": "Sonic",
          "logos": {
              "trustWallet": null,
              "coinMarketCap": null,
              "coinGecko": {
                  "small": "https://coin-images.coingecko.com/coins/images/52857/small/wrapped_sonic.png?1734536585",
                  "large": "https://coin-images.coingecko.com/coins/images/52857/large/wrapped_sonic.png?1734536585"
              }
          },
          "decimals": 18,
          "priceUsd": "597238",
          "maxLtv": "800000000000000000",
          "lt": "850000000000000000",
          "solvencyOracle": {
              "address": "0x7bd2a4820abf7F8708c0ce57a03e615956bF2f3A",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "maxLtvOracle": {
              "address": "0x7bd2a4820abf7F8708c0ce57a03e615956bF2f3A",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "collateralBaseApr": "11856097113301957",
          "collateralPrograms": [],
          "protectedPrograms": [],
          "debtBaseApr": "33842488419648000",
          "debtPrograms": [],
          "liquidity": "1041561070369931036472132",
          "tvl": "1771829315185893461346106",
          "isNonBorrowable": false,
          "collateralPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 8
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "protectedPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 8
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "debtPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 0.5,
                  "multiplier": 2
              }
          ],
          "oracleLabel": "Chainlink",
          "oracleContentKey": "sonic-9-s"
      },
      "silo1": {
          "tokenAddress": "0x50c42dEAcD8Fc9773493ED674b675bE577f2634b",
          "symbol": "ETH",
          "name": "Ether",
          "logos": {
              "trustWallet": null,
              "coinMarketCap": null,
              "coinGecko": {
                  "small": "https://coin-images.coingecko.com/coins/images/53332/small/weth_2.jpg?1736149977",
                  "large": "https://coin-images.coingecko.com/coins/images/53332/large/weth_2.jpg?1736149977"
              }
          },
          "decimals": 18,
          "priceUsd": "2291620000",
          "maxLtv": "800000000000000000",
          "lt": "850000000000000000",
          "solvencyOracle": {
              "address": "0xed4399235f377AFB48dA005607a0F52Ed7C3bC7F",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "maxLtvOracle": {
              "address": "0xed4399235f377AFB48dA005607a0F52Ed7C3bC7F",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "collateralBaseApr": "1967018493585616",
          "collateralPrograms": [],
          "protectedPrograms": [],
          "debtBaseApr": "11891989016928000",
          "debtPrograms": [],
          "liquidity": "360540210517830068334",
          "tvl": "506577438433354921241",
          "isNonBorrowable": false,
          "collateralPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 4
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "protectedPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 4
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "debtPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 0.5,
                  "multiplier": 1
              }
          ],
          "oracleLabel": "Chainlink",
          "oracleContentKey": "sonic-9-eth"
      }
  },
  {
      "protocolKey": "sonic",
      "id": "26",
      "isVerified": true,
      "configAddress": "0xefA367570B11f8745B403c0D458b9D2EAf424686",
      "boostedContentKey": null,
      "silo0": {
          "tokenAddress": "0xE8a41c62BB4d5863C6eadC96792cFE90A1f37C47",
          "symbol": "wstkscETH",
          "name": "Wrapped stkscETH",
          "logos": {
              "trustWallet": null,
              "coinMarketCap": null,
              "coinGecko": null
          },
          "decimals": 18,
          "priceUsd": "2291620000",
          "maxLtv": "850000000000000000",
          "lt": "900000000000000000",
          "solvencyOracle": {
              "address": "0x57517E75aa50C8eaC8b5d8513B86793D893fE7d7",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "maxLtvOracle": {
              "address": "0x57517E75aa50C8eaC8b5d8513B86793D893fE7d7",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "collateralBaseApr": "0",
          "collateralPrograms": [],
          "protectedPrograms": [],
          "debtBaseApr": "31536000",
          "debtPrograms": [],
          "liquidity": "0",
          "tvl": "353799647238530642027",
          "isNonBorrowable": true,
          "collateralPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 8
              },
              {
                  "_tag": "rings",
                  "multiplier": 1.5
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "protectedPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 8
              },
              {
                  "_tag": "rings",
                  "multiplier": 1.5
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "debtPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 0.5,
                  "multiplier": 1
              }
          ],
          "oracleLabel": "Pyth + RedStone",
          "oracleContentKey": "sonic-26-wstkscETH"
      },
      "silo1": {
          "tokenAddress": "0x50c42dEAcD8Fc9773493ED674b675bE577f2634b",
          "symbol": "ETH",
          "name": "Ether",
          "logos": {
              "trustWallet": null,
              "coinMarketCap": null,
              "coinGecko": {
                  "small": "https://coin-images.coingecko.com/coins/images/53332/small/weth_2.jpg?1736149977",
                  "large": "https://coin-images.coingecko.com/coins/images/53332/large/weth_2.jpg?1736149977"
              }
          },
          "decimals": 18,
          "priceUsd": "2291620000",
          "maxLtv": "0",
          "lt": "0",
          "solvencyOracle": {
              "address": "0x0000000000000000000000000000000000000000",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "maxLtvOracle": {
              "address": "0x0000000000000000000000000000000000000000",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "collateralBaseApr": "36427549825291378",
          "collateralPrograms": [],
          "protectedPrograms": [],
          "debtBaseApr": "51175897080336000",
          "debtPrograms": [],
          "liquidity": "36729769785489216032",
          "tvl": "228924138451285413648",
          "isNonBorrowable": false,
          "collateralPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 4
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 3
              }
          ],
          "protectedPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 4
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 3
              }
          ],
          "debtPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 0.5,
                  "multiplier": 1
              }
          ],
          "oracleLabel": "RedStone",
          "oracleContentKey": "sonic-26-ETH"
      }
  },
  {
      "protocolKey": "sonic",
      "id": "13",
      "isVerified": true,
      "configAddress": "0xC1F3d4F5f734d6Dc9E7D4f639EbE489Acd4542ab",
      "boostedContentKey": null,
      "silo0": {
          "tokenAddress": "0xCC0966D8418d412c599A6421b760a847eB169A8c",
          "symbol": "SolvBTC.BBN",
          "name": "SolvBTC Babylon",
          "logos": {
              "trustWallet": null,
              "coinMarketCap": null,
              "coinGecko": {
                  "small": "https://coin-images.coingecko.com/coins/images/39384/small/unnamed.png?1721961640",
                  "large": "https://coin-images.coingecko.com/coins/images/39384/large/unnamed.png?1721961640"
              }
          },
          "decimals": 18,
          "priceUsd": "90910796226",
          "maxLtv": "850000000000000000",
          "lt": "900000000000000000",
          "solvencyOracle": {
              "address": "0xb64C4eF733FaEce2ab7014E9A6751A68163cC10b",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "maxLtvOracle": {
              "address": "0xb64C4eF733FaEce2ab7014E9A6751A68163cC10b",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "collateralBaseApr": "3914624730751725",
          "collateralPrograms": [],
          "protectedPrograms": [],
          "debtBaseApr": "16776209105136000",
          "debtPrograms": [],
          "liquidity": "3058362189938642194",
          "tvl": "4263991159281670475",
          "isNonBorrowable": false,
          "collateralPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 2
              },
              {
                  "_tag": "solv",
                  "multiplier": 3
              },
              {
                  "_tag": "babylon",
                  "multiplier": 1
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "protectedPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 2
              },
              {
                  "_tag": "solv",
                  "multiplier": 3
              },
              {
                  "_tag": "babylon",
                  "multiplier": 1
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "debtPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 0.5,
                  "multiplier": 1
              }
          ],
          "oracleLabel": "RedStone",
          "oracleContentKey": "sonic-12-solv-btc-bbn"
      },
      "silo1": {
          "tokenAddress": "0x541FD749419CA806a8bc7da8ac23D346f2dF8B77",
          "symbol": "SolvBTC",
          "name": "Solv BTC",
          "logos": {
              "trustWallet": null,
              "coinMarketCap": null,
              "coinGecko": {
                  "small": "https://coin-images.coingecko.com/coins/images/36800/small/solvBTC.png?1719810684",
                  "large": "https://coin-images.coingecko.com/coins/images/36800/large/solvBTC.png?1719810684"
              }
          },
          "decimals": 18,
          "priceUsd": "91366442812",
          "maxLtv": "850000000000000000",
          "lt": "900000000000000000",
          "solvencyOracle": {
              "address": "0x781e40467A6DF17c5C1dA6267294E727A64c2b72",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "maxLtvOracle": {
              "address": "0x781e40467A6DF17c5C1dA6267294E727A64c2b72",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "collateralBaseApr": "557816137369028",
          "collateralPrograms": [],
          "protectedPrograms": [],
          "debtBaseApr": "6332805339840000",
          "debtPrograms": [],
          "liquidity": "2762910451989274417",
          "tvl": "3084088927980847738",
          "isNonBorrowable": false,
          "collateralPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 2
              },
              {
                  "_tag": "solv",
                  "multiplier": 3
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "protectedPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 2
              },
              {
                  "_tag": "solv",
                  "multiplier": 3
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "debtPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 0.5,
                  "multiplier": 1
              }
          ],
          "oracleLabel": "RedStone",
          "oracleContentKey": "sonic-12-solv-btc"
      }
  },
  {
      "protocolKey": "sonic",
      "id": "33",
      "isVerified": true,
      "configAddress": "0x11BBa83002915bB204B348C2174626612260DDaa",
      "boostedContentKey": null,
      "silo0": {
          "tokenAddress": "0xf26Ff70573ddc8a90Bd7865AF8d7d70B8Ff019bC",
          "symbol": "EGGS",
          "name": "Eggs",
          "logos": {
              "trustWallet": null,
              "coinMarketCap": null,
              "coinGecko": {
                  "small": "https://coin-images.coingecko.com/coins/images/54477/small/eggs-logo200px.png?1739954642",
                  "large": "https://coin-images.coingecko.com/coins/images/54477/large/eggs-logo200px.png?1739954642"
              }
          },
          "decimals": 18,
          "priceUsd": "671",
          "maxLtv": "700000000000000000",
          "lt": "750000000000000000",
          "solvencyOracle": {
              "address": "0xFEa1822A9024592FF598A5f4262Ba0018AF5492F",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "maxLtvOracle": {
              "address": "0xFEa1822A9024592FF598A5f4262Ba0018AF5492F",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "collateralBaseApr": "0",
          "collateralPrograms": [],
          "protectedPrograms": [],
          "debtBaseApr": "0",
          "debtPrograms": [],
          "liquidity": "0",
          "tvl": "478130463317061848437397876",
          "isNonBorrowable": true,
          "collateralPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "protectedPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "debtPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 0.5,
                  "multiplier": 1
              }
          ],
          "oracleLabel": "Custom oracle",
          "oracleContentKey": "sonic-33-eggs"
      },
      "silo1": {
          "tokenAddress": "0x29219dd400f2Bf60E5a23d13Be72B486D4038894",
          "symbol": "USDC",
          "name": "Bridged USDC (Sonic Labs)",
          "logos": {
              "trustWallet": null,
              "coinMarketCap": null,
              "coinGecko": {
                  "small": "https://coin-images.coingecko.com/coins/images/53064/small/logo.png?1735179479",
                  "large": "https://coin-images.coingecko.com/coins/images/53064/large/logo.png?1735179479"
              }
          },
          "decimals": 6,
          "priceUsd": "999933",
          "maxLtv": "0",
          "lt": "0",
          "solvencyOracle": {
              "address": "0x688951Ad1FAfb55484Fd4a3f867aacA88B0Bfa4c",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "maxLtvOracle": {
              "address": "0x688951Ad1FAfb55484Fd4a3f867aacA88B0Bfa4c",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "collateralBaseApr": "24862550855779954",
          "collateralPrograms": [],
          "protectedPrograms": [],
          "debtBaseApr": "68752330041024000",
          "debtPrograms": [],
          "liquidity": "34668927777",
          "tvl": "57969768085",
          "isNonBorrowable": false,
          "collateralPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 10
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 2
              }
          ],
          "protectedPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 10
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 2
              }
          ],
          "debtPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 0.5,
                  "multiplier": 1
              }
          ],
          "oracleLabel": "Chainlink",
          "oracleContentKey": "sonic-usdc-chainlink"
      }
  },
  {
      "protocolKey": "sonic",
      "id": "28",
      "isVerified": true,
      "configAddress": "0xA3BF8b1eE377bBe6152A6885eaeE8747dcBEa35D",
      "boostedContentKey": "sonic-sts-s-28",
      "silo0": {
          "tokenAddress": "0xE5DA20F15420aD15DE0fa650600aFc998bbE3955",
          "symbol": "stS",
          "name": "Beets Staked Sonic",
          "logos": {
              "trustWallet": null,
              "coinMarketCap": null,
              "coinGecko": {
                  "small": "https://coin-images.coingecko.com/coins/images/52937/small/token-beets-staked-sonic.png?1734712659",
                  "large": "https://coin-images.coingecko.com/coins/images/52937/large/token-beets-staked-sonic.png?1734712659"
              }
          },
          "decimals": 18,
          "priceUsd": "604415",
          "maxLtv": "950000000000000000",
          "lt": "970000000000000000",
          "solvencyOracle": {
              "address": "0x2CDAc4D76E84E61d5954c46a92587426941A13F3",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "maxLtvOracle": {
              "address": "0x2CDAc4D76E84E61d5954c46a92587426941A13F3",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "collateralBaseApr": "12497424138984557",
          "collateralPrograms": [],
          "protectedPrograms": [],
          "debtBaseApr": "34745747672016000",
          "debtPrograms": [],
          "liquidity": "45396692448778067496068",
          "tvl": "78798070632243606605148",
          "isNonBorrowable": false,
          "collateralPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 8
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "protectedPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 8
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "debtPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 0.5,
                  "multiplier": 1
              }
          ],
          "oracleLabel": "RedStone",
          "oracleContentKey": "sonic-sts-s-3"
      },
      "silo1": {
          "tokenAddress": "0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38",
          "symbol": "S",
          "name": "Sonic",
          "logos": {
              "trustWallet": null,
              "coinMarketCap": null,
              "coinGecko": {
                  "small": "https://coin-images.coingecko.com/coins/images/52857/small/wrapped_sonic.png?1734536585",
                  "large": "https://coin-images.coingecko.com/coins/images/52857/large/wrapped_sonic.png?1734536585"
              }
          },
          "decimals": 18,
          "priceUsd": "597238",
          "maxLtv": "700000000000000000",
          "lt": "750000000000000000",
          "solvencyOracle": {
              "address": "0x0000000000000000000000000000000000000000",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "maxLtvOracle": {
              "address": "0x0000000000000000000000000000000000000000",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "collateralBaseApr": "34075478729187860",
          "collateralPrograms": [],
          "protectedPrograms": [],
          "debtBaseApr": "57373637516496000",
          "debtPrograms": [],
          "liquidity": "26598504287546319448838",
          "tvl": "88288525076070736214024",
          "isNonBorrowable": false,
          "collateralPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 8
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 2
              }
          ],
          "protectedPoints": [
              {
                  "_tag": "sonic",
                  "multiplier": 8
              },
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 2
              }
          ],
          "debtPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 0.5,
                  "multiplier": 1
              }
          ],
          "oracleLabel": "RedStone",
          "oracleContentKey": "sonic-sts-s-3"
      }
  },
  {
      "protocolKey": "sonic",
      "id": "32",
      "isVerified": true,
      "configAddress": "0xe67cce118e9CcEaE51996E4d290f9B77D960E3d7",
      "boostedContentKey": null,
      "silo0": {
          "tokenAddress": "0xecAc9C5F704e954931349Da37F60E39f515c11c1",
          "symbol": "LBTC",
          "name": "Lombard Staked Bitcoin",
          "logos": {
              "trustWallet": null,
              "coinMarketCap": null,
              "coinGecko": {
                  "small": "https://coin-images.coingecko.com/coins/images/39969/small/LBTC_Logo.png?1724959872",
                  "large": "https://coin-images.coingecko.com/coins/images/39969/large/LBTC_Logo.png?1724959872"
              }
          },
          "decimals": 8,
          "priceUsd": "91180015738",
          "maxLtv": "920000000000000000",
          "lt": "950000000000000000",
          "solvencyOracle": {
              "address": "0x0000000000000000000000000000000000000000",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "maxLtvOracle": {
              "address": "0x0000000000000000000000000000000000000000",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "collateralBaseApr": "10817802758703969",
          "collateralPrograms": [],
          "protectedPrograms": [],
          "debtBaseApr": "35284779464112000",
          "debtPrograms": [],
          "liquidity": "5954902",
          "tvl": "9314560",
          "isNonBorrowable": false,
          "collateralPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "protectedPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "debtPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 0.5,
                  "multiplier": 1
              }
          ],
          "oracleLabel": "Chainlink",
          "oracleContentKey": "sonic-btc-chainlink"
      },
      "silo1": {
          "tokenAddress": "0xBb30e76d9Bb2CC9631F7fC5Eb8e87B5Aff32bFbd",
          "symbol": "scBTC",
          "name": "Sonic BTC",
          "logos": {
              "trustWallet": null,
              "coinMarketCap": null,
              "coinGecko": null
          },
          "decimals": 8,
          "priceUsd": "91180015738",
          "maxLtv": "920000000000000000",
          "lt": "950000000000000000",
          "solvencyOracle": {
              "address": "0x0000000000000000000000000000000000000000",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "maxLtvOracle": {
              "address": "0x0000000000000000000000000000000000000000",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "collateralBaseApr": "0",
          "collateralPrograms": [],
          "protectedPrograms": [],
          "debtBaseApr": "0",
          "debtPrograms": [],
          "liquidity": "8997067",
          "tvl": "8997067",
          "isNonBorrowable": false,
          "collateralPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "protectedPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "debtPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 0.5,
                  "multiplier": 1
              }
          ],
          "oracleLabel": "Chainlink",
          "oracleContentKey": "sonic-btc-chainlink"
      }
  },
  {
      "protocolKey": "sonic",
      "id": "31",
      "isVerified": true,
      "configAddress": "0x91D87099fA714a201297856D29380195adB62962",
      "boostedContentKey": null,
      "silo0": {
          "tokenAddress": "0xecAc9C5F704e954931349Da37F60E39f515c11c1",
          "symbol": "LBTC",
          "name": "Lombard Staked Bitcoin",
          "logos": {
              "trustWallet": null,
              "coinMarketCap": null,
              "coinGecko": {
                  "small": "https://coin-images.coingecko.com/coins/images/39969/small/LBTC_Logo.png?1724959872",
                  "large": "https://coin-images.coingecko.com/coins/images/39969/large/LBTC_Logo.png?1724959872"
              }
          },
          "decimals": 8,
          "priceUsd": "91180015738",
          "maxLtv": "950000000000000000",
          "lt": "970000000000000000",
          "solvencyOracle": {
              "address": "0x0000000000000000000000000000000000000000",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "maxLtvOracle": {
              "address": "0x0000000000000000000000000000000000000000",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "collateralBaseApr": "0",
          "collateralPrograms": [],
          "protectedPrograms": [],
          "debtBaseApr": "0",
          "debtPrograms": [],
          "liquidity": "15000",
          "tvl": "15000",
          "isNonBorrowable": false,
          "collateralPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "protectedPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "debtPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 0.5,
                  "multiplier": 1
              }
          ],
          "oracleLabel": "Chainlink",
          "oracleContentKey": "sonic-btc-chainlink"
      },
      "silo1": {
          "tokenAddress": "0x0555E30da8f98308EdB960aa94C0Db47230d2B9c",
          "symbol": "WBTC",
          "name": "Wrapped BTC",
          "logos": {
              "trustWallet": null,
              "coinMarketCap": null,
              "coinGecko": {
                  "small": "https://coin-images.coingecko.com/coins/images/54335/small/wbtc.jpg?1739334808",
                  "large": "https://coin-images.coingecko.com/coins/images/54335/large/wbtc.jpg?1739334808"
              }
          },
          "decimals": 8,
          "priceUsd": "91180015738",
          "maxLtv": "950000000000000000",
          "lt": "970000000000000000",
          "solvencyOracle": {
              "address": "0x0000000000000000000000000000000000000000",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "maxLtvOracle": {
              "address": "0x0000000000000000000000000000000000000000",
              "oracleKey": "none",
              "baseToken": null,
              "quoteToken": null,
              "name": null
          },
          "collateralBaseApr": "0",
          "collateralPrograms": [],
          "protectedPrograms": [],
          "debtBaseApr": "0",
          "debtPrograms": [],
          "liquidity": "0",
          "tvl": "0",
          "isNonBorrowable": false,
          "collateralPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "protectedPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 1,
                  "multiplier": 1
              }
          ],
          "debtPoints": [
              {
                  "_tag": "silo",
                  "basePoints": 0.5,
                  "multiplier": 1
              }
          ],
          "oracleLabel": "Chainlink",
          "oracleContentKey": "sonic-btc-chainlink"
      }
  }
]
