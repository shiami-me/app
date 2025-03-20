// This file contains the hardcoded market data
// The dynamic values (liquidity, collateralBaseApr, debtBaseApr, maxLtv, lt) will be updated using SiloLens
export const siloMarketData = [
    {
        "chainKey": "sonic",
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
            "priceUsd": "526805",
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
            "collateralBaseApr": "20766521784489223",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "38639588699520000",
            "debtPrograms": [],
            "liquidity": "64820850681587461044243490",
            "tvl": "176311808437348208774273538",
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
            "priceUsd": "519603",
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
            "collateralBaseApr": "52021198350974498",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "67505237817264000",
            "debtPrograms": [],
            "liquidity": "18203186868897523677181893",
            "tvl": "195033315355982061581749122",
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
        "chainKey": "sonic",
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
            "priceUsd": "519603",
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
            "collateralBaseApr": "13532401787575437",
            "collateralPrograms": [
                {
                    "rewardTokenSymbol": "SILO",
                    "apr": "7752922272049648"
                }
            ],
            "protectedPrograms": [],
            "debtBaseApr": "44111624438160000",
            "debtPrograms": [],
            "liquidity": "19983377920669846949300455",
            "tvl": "31878666936051957834802372",
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
            "priceUsd": "999880",
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
            "collateralBaseApr": "31514063975013132",
            "collateralPrograms": [
                {
                    "rewardTokenSymbol": "S",
                    "apr": "37359449751096583"
                },
                {
                    "rewardTokenSymbol": "SILO",
                    "apr": "2663892869225425"
                }
            ],
            "protectedPrograms": [],
            "debtBaseApr": "74297442764880000",
            "debtPrograms": [],
            "liquidity": "35538535792114",
            "tvl": "70960547410172",
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
        "chainKey": "sonic",
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
            "priceUsd": "519603",
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
            "tvl": "45412415784653511663742092",
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
            "priceUsd": "999880",
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
            "collateralBaseApr": "31329345836696090",
            "collateralPrograms": [
                {
                    "rewardTokenSymbol": "S",
                    "apr": "18390840562910510"
                },
                {
                    "rewardTokenSymbol": "SILO",
                    "apr": "9161034988054586"
                }
            ],
            "protectedPrograms": [],
            "debtBaseApr": "71992205126064000",
            "debtPrograms": [],
            "liquidity": "10653448900850",
            "tvl": "20635166345071",
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
        "chainKey": "sonic",
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
            "priceUsd": "84893600000",
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
            "collateralBaseApr": "12828579669249286",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "38424365622576000",
            "debtPrograms": [],
            "liquidity": "9223663700",
            "tvl": "15190067611",
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
            "priceUsd": "84893600000",
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
            "collateralBaseApr": "6431286170680958",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "27206107673040000",
            "debtPrograms": [],
            "liquidity": "11963266322",
            "tvl": "16572643641",
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
            "oracleLabel": "Chainlink",
            "oracleContentKey": "sonic-btc-chainlink"
        }
    },
    {
        "chainKey": "sonic",
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
            "priceUsd": "525452",
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
            "liquidity": "1266142052776475087216607",
            "tvl": "17292573761767479470856626",
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
            "priceUsd": "519603",
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
            "collateralBaseApr": "41540163715100906",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "54649315072368000",
            "debtPrograms": [],
            "liquidity": "1791779979470214027576527",
            "tvl": "16945395618128840679684825",
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
        "chainKey": "sonic",
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
            "priceUsd": "1001111",
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
            "liquidity": "1577224566724",
            "tvl": "5975985097866",
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
            "priceUsd": "999880",
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
            "collateralBaseApr": "37118361766831133",
            "collateralPrograms": [
                {
                    "rewardTokenSymbol": "SILO",
                    "apr": "20492489044629436"
                }
            ],
            "protectedPrograms": [],
            "debtBaseApr": "78361773747120000",
            "debtPrograms": [],
            "liquidity": "4235694973561",
            "tvl": "8943613534258",
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
        "chainKey": "sonic",
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
            "priceUsd": "522522",
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
            "liquidity": "3972135413810979845477853",
            "tvl": "11343781716174089553697086",
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
            "priceUsd": "519603",
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
            "collateralBaseApr": "33031061790996419",
            "collateralPrograms": [
                {
                    "rewardTokenSymbol": "wOS",
                    "apr": "16430699201693808"
                },
                {
                    "rewardTokenSymbol": "SILO",
                    "apr": "15739608083885023"
                }
            ],
            "protectedPrograms": [],
            "debtBaseApr": "70158904767936000",
            "debtPrograms": [],
            "liquidity": "7689330683553764662884571",
            "tvl": "17236596761678213244800561",
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
        "chainKey": "sonic",
        "protocolKey": "sonic",
        "id": "37",
        "isVerified": true,
        "configAddress": "0xe7579D515BD1676b6Da703786189a457B9bB3Fc3",
        "boostedContentKey": null,
        "silo0": {
            "tokenAddress": "0xBe27993204Ec64238F71A527B4c4D5F4949034C3",
            "symbol": "PT-wstkscUSD (29 May)",
            "name": "Rings • Pendle",
            "logos": {
                "trustWallet": null,
                "coinMarketCap": null,
                "coinGecko": null
            },
            "decimals": 6,
            "priceUsd": "980254",
            "maxLtv": "850000000000000000",
            "lt": "900000000000000000",
            "solvencyOracle": {
                "address": "0x347DdE1179A9cEC4E17d72250Bdf16c2ed8c70CD",
                "oracleKey": "none",
                "baseToken": null,
                "quoteToken": null,
                "name": null
            },
            "maxLtvOracle": {
                "address": "0x347DdE1179A9cEC4E17d72250Bdf16c2ed8c70CD",
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
            "tvl": "3123539935823",
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
            "oracleContentKey": "sonic-37-PT_wstkscUSD"
        },
        "silo1": {
            "tokenAddress": "0x80Eede496655FB9047dd39d9f418d5483ED600df",
            "symbol": "frxUSD",
            "name": "Frax USD",
            "logos": {
                "trustWallet": null,
                "coinMarketCap": null,
                "coinGecko": {
                    "small": "https://coin-images.coingecko.com/coins/images/53963/small/frxUSD.png?1737792154",
                    "large": "https://coin-images.coingecko.com/coins/images/53963/large/frxUSD.png?1737792154"
                }
            },
            "decimals": 18,
            "priceUsd": "998825",
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
            "collateralBaseApr": "11371530738274362",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "46497251156832000",
            "debtPrograms": [],
            "liquidity": "6425464484130455300424088",
            "tvl": "8823002814308899532517664",
            "isNonBorrowable": false,
            "collateralPoints": [
                {
                    "_tag": "silo",
                    "basePoints": 1,
                    "multiplier": 2
                }
            ],
            "protectedPoints": [
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
                    "multiplier": 0
                }
            ],
            "oracleLabel": "Custom oracle",
            "oracleContentKey": "sonic-37-frxUSD"
        }
    },
    {
        "chainKey": "sonic",
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
            "priceUsd": "5027158",
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
            "liquidity": "2112738777720345033",
            "tvl": "625489063177747505546662",
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
            "priceUsd": "999880",
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
            "collateralBaseApr": "90558730460508508",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "187662397156272000",
            "debtPrograms": [],
            "liquidity": "564974499751",
            "tvl": "1423835566475",
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
        "chainKey": "sonic",
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
            "priceUsd": "519603",
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
            "collateralBaseApr": "5209927674149478",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "16739091516960000",
            "debtPrograms": [],
            "liquidity": "772079962909106641292005",
            "tvl": "1392355326023261402125829",
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
            "priceUsd": "999880",
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
            "collateralBaseApr": "6354380561287497",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "32860675671840000",
            "debtPrograms": [],
            "liquidity": "2687931997038",
            "tvl": "3492115340212",
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
        "chainKey": "sonic",
        "protocolKey": "sonic",
        "id": "35",
        "isVerified": true,
        "configAddress": "0x4BB15418ef55367c638CA376b50276FACB4A30Ca",
        "boostedContentKey": null,
        "silo0": {
            "tokenAddress": "0xa2161E75EDf50d70544e6588788A5732A3105c00",
            "symbol": "PT-wstkscETH (29 May)",
            "name": "Rings • Pendle",
            "logos": {
                "trustWallet": null,
                "coinMarketCap": null,
                "coinGecko": null
            },
            "decimals": 18,
            "priceUsd": "1940232495",
            "maxLtv": "870000000000000000",
            "lt": "920000000000000000",
            "solvencyOracle": {
                "address": "0x47Ed81d2Ee438B1b02719E70114090521fbf950a",
                "oracleKey": "none",
                "baseToken": null,
                "quoteToken": null,
                "name": null
            },
            "maxLtvOracle": {
                "address": "0x47Ed81d2Ee438B1b02719E70114090521fbf950a",
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
            "tvl": "1007898612515514139957",
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
            "oracleContentKey": "sonic-35-PT-wstkscETH"
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
            "priceUsd": "1968917300",
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
            "collateralBaseApr": "29645371531730909",
            "collateralPrograms": [
                {
                    "rewardTokenSymbol": "SILO",
                    "apr": "23036328606853127"
                }
            ],
            "protectedPrograms": [],
            "debtBaseApr": "46166684245344000",
            "debtPrograms": [],
            "liquidity": "246961606934007303188",
            "tvl": "1009886995237480497137",
            "isNonBorrowable": false,
            "collateralPoints": [
                {
                    "_tag": "sonic",
                    "multiplier": 4
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
                    "multiplier": 4
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
            "oracleLabel": "Redstone",
            "oracleContentKey": "sonic-35-eth"
        }
    },
    {
        "chainKey": "sonic",
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
            "priceUsd": "84399083776",
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
            "collateralBaseApr": "10627200313323109",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "27641309802624000",
            "debtPrograms": [],
            "liquidity": "3048287528987361801",
            "tvl": "5614110448078028188",
            "isNonBorrowable": false,
            "collateralPoints": [
                {
                    "_tag": "sonic",
                    "multiplier": 2
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
                    "multiplier": 2
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
            "priceUsd": "84750484793",
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
            "collateralBaseApr": "91463933488310",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "2564338518576000",
            "debtPrograms": [],
            "liquidity": "33264948901092604454",
            "tvl": "34723713510066455131",
            "isNonBorrowable": false,
            "collateralPoints": [
                {
                    "_tag": "sonic",
                    "multiplier": 2
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
                    "multiplier": 2
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
            "oracleContentKey": "sonic-12-solv-btc"
        }
    },
    {
        "chainKey": "sonic",
        "protocolKey": "sonic",
        "id": "34",
        "isVerified": true,
        "configAddress": "0x3605509B2C8Bff9808da5dd5c81547d9EDC4Ffa2",
        "boostedContentKey": null,
        "silo0": {
            "tokenAddress": "0xBe27993204Ec64238F71A527B4c4D5F4949034C3",
            "symbol": "PT-wstkscUSD (29 May)",
            "name": "Rings • Pendle",
            "logos": {
                "trustWallet": null,
                "coinMarketCap": null,
                "coinGecko": null
            },
            "decimals": 6,
            "priceUsd": "980254",
            "maxLtv": "870000000000000000",
            "lt": "920000000000000000",
            "solvencyOracle": {
                "address": "0xD284EecDC7b1846D5979EdBB1e47D51224119491",
                "oracleKey": "none",
                "baseToken": null,
                "quoteToken": null,
                "name": null
            },
            "maxLtvOracle": {
                "address": "0xD284EecDC7b1846D5979EdBB1e47D51224119491",
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
            "tvl": "859030954240",
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
            "oracleContentKey": "sonic-34-PT-wstkscUSD"
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
            "priceUsd": "999880",
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
            "collateralBaseApr": "32702909275110772",
            "collateralPrograms": [
                {
                    "rewardTokenSymbol": "SILO",
                    "apr": "55111333890447336"
                }
            ],
            "protectedPrograms": [],
            "debtBaseApr": "89859579194304000",
            "debtPrograms": [],
            "liquidity": "990218160049",
            "tvl": "1662473422445",
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
            "oracleLabel": "Redstone",
            "oracleContentKey": "sonic-34-usdc"
        }
    },
    {
        "chainKey": "sonic",
        "protocolKey": "sonic",
        "id": "40",
        "isVerified": true,
        "configAddress": "0xC38a36CC0f1D616351d901A75BF3D58FCA4De71F",
        "boostedContentKey": null,
        "silo0": {
            "tokenAddress": "0x420df605D062F8611EFb3F203BF258159b8FfFdE",
            "symbol": "PT-stS (29 May)",
            "name": "Beets • Pendle",
            "logos": {
                "trustWallet": null,
                "coinMarketCap": null,
                "coinGecko": null
            },
            "decimals": 18,
            "priceUsd": "510147",
            "maxLtv": "900000000000000000",
            "lt": "950000000000000000",
            "solvencyOracle": {
                "address": "0xFBf2164Aa3D034db7A6F75859b862D69a5b12854",
                "oracleKey": "none",
                "baseToken": null,
                "quoteToken": null,
                "name": null
            },
            "maxLtvOracle": {
                "address": "0xFBf2164Aa3D034db7A6F75859b862D69a5b12854",
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
            "tvl": "1431366889039080646574087",
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
            "oracleContentKey": "sonic-40-PT_stS"
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
            "priceUsd": "519603",
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
            "collateralBaseApr": "13005497099949751",
            "collateralPrograms": [
                {
                    "rewardTokenSymbol": "SILO",
                    "apr": "56827305031766696"
                }
            ],
            "protectedPrograms": [],
            "debtBaseApr": "39975750034848000",
            "debtPrograms": [],
            "liquidity": "1853266237852858168008692",
            "tvl": "3002440195599303482057245",
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
        "chainKey": "sonic",
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
            "priceUsd": "519603",
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
            "collateralBaseApr": "54379665737375319",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "72478523232720000",
            "debtPrograms": [],
            "liquidity": "73943127661247348139025",
            "tvl": "630323213897258721590511",
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
            "priceUsd": "1968917300",
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
            "collateralBaseApr": "985895864866926",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "8419105906992000",
            "debtPrograms": [],
            "liquidity": "590115329408509548035",
            "tvl": "743495916805653367081",
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
        "chainKey": "sonic",
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
            "priceUsd": "1969575804",
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
            "liquidity": "280633667499592940",
            "tvl": "355846907243914576256",
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
            "priceUsd": "1968917300",
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
            "collateralBaseApr": "12445620695465808",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "29912898876336000",
            "debtPrograms": [],
            "liquidity": "206435328043344200764",
            "tvl": "420369156730999353492",
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
        "chainKey": "sonic",
        "protocolKey": "sonic",
        "id": "41",
        "isVerified": true,
        "configAddress": "0x115d53d01df03293A5c5A1df569f450869613BDD",
        "boostedContentKey": null,
        "silo0": {
            "tokenAddress": "0x46eb02b9F47634c4fab3110CC7ADc1C6311DfAC1",
            "symbol": "PT-wOS (29 May)",
            "name": "Origin • Pendle",
            "logos": {
                "trustWallet": null,
                "coinMarketCap": null,
                "coinGecko": null
            },
            "decimals": 18,
            "priceUsd": "511063",
            "maxLtv": "900000000000000000",
            "lt": "950000000000000000",
            "solvencyOracle": {
                "address": "0x9CB7c9175e6A19F5f76f9ca04C6c5E4832DAa67d",
                "oracleKey": "none",
                "baseToken": null,
                "quoteToken": null,
                "name": null
            },
            "maxLtvOracle": {
                "address": "0x9CB7c9175e6A19F5f76f9ca04C6c5E4832DAa67d",
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
            "tvl": "76147471399911904714734",
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
            "oracleContentKey": "sonic-41-PT_wOS"
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
            "priceUsd": "519603",
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
            "collateralBaseApr": "995999021476101",
            "collateralPrograms": [
                {
                    "rewardTokenSymbol": "SILO",
                    "apr": "164043227378025644"
                }
            ],
            "protectedPrograms": [],
            "debtBaseApr": "11062738764720000",
            "debtPrograms": [],
            "liquidity": "450434137509397251493088",
            "tvl": "503796146297902675979472",
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
            "oracleContentKey": "sonic-41-S"
        }
    },
    {
        "chainKey": "sonic",
        "protocolKey": "sonic",
        "id": "36",
        "isVerified": true,
        "configAddress": "0xDace786ceF546C258C67B3EF68AeD91B887BE0f0",
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
            "priceUsd": "526805",
            "maxLtv": "700000000000000000",
            "lt": "750000000000000000",
            "solvencyOracle": {
                "address": "0x4D7262786976917f0d7a83d6Ef3089273e117cF7",
                "oracleKey": "none",
                "baseToken": null,
                "quoteToken": null,
                "name": null
            },
            "maxLtvOracle": {
                "address": "0x4D7262786976917f0d7a83d6Ef3089273e117cF7",
                "oracleKey": "none",
                "baseToken": null,
                "quoteToken": null,
                "name": null
            },
            "collateralBaseApr": "5097251314158875",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "18604011729312000",
            "debtPrograms": [],
            "liquidity": "109568687141226985342399",
            "tvl": "157523513444071640014613",
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
            "oracleLabel": "Custom oracle",
            "oracleContentKey": "sonic-36-stS"
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
            "priceUsd": "999880",
            "maxLtv": "700000000000000000",
            "lt": "750000000000000000",
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
            "collateralBaseApr": "1364745348697993",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "13859114819328000",
            "debtPrograms": [],
            "liquidity": "137823018797",
            "tvl": "154755461089",
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
        "chainKey": "sonic",
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
            "priceUsd": "586",
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
            "liquidity": "14391524320288066976198",
            "tvl": "166676137119148278299927330",
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
            "priceUsd": "999880",
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
            "collateralBaseApr": "72819088947505865",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "117661901027616000",
            "debtPrograms": [],
            "liquidity": "8282386946",
            "tvl": "26530122336",
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
        "chainKey": "sonic",
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
            "priceUsd": "526805",
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
            "collateralBaseApr": "18838084926844873",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "42658901474112000",
            "debtPrograms": [],
            "liquidity": "49408471906083435855943",
            "tvl": "102932752630630840641379",
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
            "priceUsd": "519603",
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
            "collateralBaseApr": "33908472819965150",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "57232879797168000",
            "debtPrograms": [],
            "liquidity": "30521618061781810720562",
            "tvl": "100737243512057742266013",
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
        "chainKey": "sonic",
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
            "priceUsd": "84893600000",
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
            "collateralBaseApr": "2434077945247146",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "16737219066960000",
            "debtPrograms": [],
            "liquidity": "1918550",
            "tvl": "2744554",
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
            "priceUsd": "84893600000",
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
            "collateralBaseApr": "52830992985643200",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "77975872224768000",
            "debtPrograms": [],
            "liquidity": "528541",
            "tvl": "2604858",
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
        "chainKey": "sonic",
        "protocolKey": "sonic",
        "id": "44",
        "isVerified": true,
        "configAddress": "0xAD108d6c7Bcfc529B889598d96653Bbb3D00e2fc",
        "boostedContentKey": null,
        "silo0": {
            "tokenAddress": "0xBe27993204Ec64238F71A527B4c4D5F4949034C3",
            "symbol": "PT-wstkscUSD (29 May)",
            "name": "Rings • Pendle",
            "logos": {
                "trustWallet": null,
                "coinMarketCap": null,
                "coinGecko": null
            },
            "decimals": 6,
            "priceUsd": "980254",
            "maxLtv": "920000000000000000",
            "lt": "950000000000000000",
            "solvencyOracle": {
                "address": "0x59740b1bB23be46492D73A8781a32b5e6B6762bC",
                "oracleKey": "none",
                "baseToken": null,
                "quoteToken": null,
                "name": null
            },
            "maxLtvOracle": {
                "address": "0x59740b1bB23be46492D73A8781a32b5e6B6762bC",
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
            "tvl": "108197236",
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
            "oracleContentKey": "sonic-44-PT_wstkscUSD"
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
            "priceUsd": "999880",
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
            "collateralBaseApr": "0",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "31536000",
            "debtPrograms": [],
            "liquidity": "20000000",
            "tvl": "20000000",
            "isNonBorrowable": false,
            "collateralPoints": [
                {
                    "_tag": "sonic",
                    "multiplier": 12
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
            "oracleContentKey": "sonic-44-scUSD"
        }
    }
]