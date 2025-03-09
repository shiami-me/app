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
            "priceUsd": "467240",
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
            "collateralBaseApr": "20641231959055680",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "38522849586192000",
            "debtPrograms": [],
            "liquidity": "49549818601542492720335253",
            "tvl": "134080430889949540666467631",
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
            "priceUsd": "461502",
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
            "collateralBaseApr": "40288344201411498",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "53819581026384000",
            "debtPrograms": [],
            "liquidity": "17194424599033452590166084",
            "tvl": "144113128015200888612400479",
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
            "priceUsd": "461502",
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
            "collateralBaseApr": "21340042107348704",
            "collateralPrograms": [
                {
                    "rewardTokenSymbol": "SILO",
                    "apr": "10290835941278854"
                }
            ],
            "protectedPrograms": [],
            "debtBaseApr": "55394064612576000",
            "debtPrograms": [],
            "liquidity": "16629200767443165975991754",
            "tvl": "30699363156802579082682697",
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
            "priceUsd": "999863",
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
            "collateralBaseApr": "37503102231302125",
            "collateralPrograms": [
                {
                    "rewardTokenSymbol": "S",
                    "apr": "49228561652850094"
                },
                {
                    "rewardTokenSymbol": "SILO",
                    "apr": "2413293133534606"
                }
            ],
            "protectedPrograms": [],
            "debtBaseApr": "81050418347616000",
            "debtPrograms": [],
            "liquidity": "40911062011859",
            "tvl": "89811728822300",
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
            "priceUsd": "461502",
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
            "tvl": "79341474806964836152660889",
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
            "priceUsd": "999863",
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
            "collateralBaseApr": "55279683881601118",
            "collateralPrograms": [
                {
                    "rewardTokenSymbol": "S",
                    "apr": "25909424150340481"
                },
                {
                    "rewardTokenSymbol": "SILO",
                    "apr": "7775811166937826"
                }
            ],
            "protectedPrograms": [],
            "debtBaseApr": "95629666714704000",
            "debtPrograms": [],
            "liquidity": "9968363277948",
            "tvl": "27875499780718",
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
            "priceUsd": "465337",
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
            "tvl": "13745727743186042670057095",
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
            "priceUsd": "461502",
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
            "collateralBaseApr": "24511039657558254",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "41978934194256000",
            "debtPrograms": [],
            "liquidity": "5462500809337092191426346",
            "tvl": "17448081489269038632264957",
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
            "priceUsd": "460424",
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
            "liquidity": "1370637151090366332107814",
            "tvl": "11135020940015074582247557",
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
            "priceUsd": "461502",
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
            "collateralBaseApr": "31346856373867722",
            "collateralPrograms": [
                {
                    "rewardTokenSymbol": "SILO",
                    "apr": "20666107429303030"
                },
                {
                    "rewardTokenSymbol": "wOS",
                    "apr": "16578073001078637"
                }
            ],
            "protectedPrograms": [],
            "debtBaseApr": "68346865350288000",
            "debtPrograms": [],
            "liquidity": "7803152410995672066683677",
            "tvl": "16956979148262638983201443",
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
            "priceUsd": "1000189",
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
            "tvl": "4587606808294",
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
            "priceUsd": "999863",
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
            "collateralBaseApr": "88414066777718152",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "120940161952608000",
            "debtPrograms": [],
            "liquidity": "710940439406",
            "tvl": "3788465735061",
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
            "priceUsd": "5978872",
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
            "tvl": "541356399112468000340190",
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
            "priceUsd": "999863",
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
            "collateralBaseApr": "113666841578537404",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "210246783877152000",
            "debtPrograms": [],
            "liquidity": "370276664314",
            "tvl": "1142103674161",
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
            "priceUsd": "970529",
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
            "tvl": "1244986846186",
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
            "priceUsd": "999863",
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
            "collateralBaseApr": "41721192009196996",
            "collateralPrograms": [
                {
                    "rewardTokenSymbol": "SILO",
                    "apr": "50345119524273538"
                }
            ],
            "protectedPrograms": [],
            "debtBaseApr": "101496419296848000",
            "debtPrograms": [],
            "liquidity": "1133700119521",
            "tvl": "2086823795507",
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
            "priceUsd": "2101376230",
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
            "tvl": "733804556177606707960",
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
            "priceUsd": "2137421500",
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
            "collateralBaseApr": "53181527550126773",
            "collateralPrograms": [
                {
                    "rewardTokenSymbol": "SILO",
                    "apr": "38300116885605989"
                }
            ],
            "protectedPrograms": [],
            "debtBaseApr": "66385505022480000",
            "debtPrograms": [],
            "liquidity": "36909657276117237885",
            "tvl": "641598567237938920422",
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
            "priceUsd": "461502",
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
            "collateralBaseApr": "37232481053505085",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "59972520096432000",
            "debtPrograms": [],
            "liquidity": "267081737498448653214986",
            "tvl": "990597396259608751244874",
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
            "priceUsd": "2137421500",
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
            "collateralBaseApr": "1479045379673783",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "10311961969584000",
            "debtPrograms": [],
            "liquidity": "650642670787843269837",
            "tvl": "841811914039055141698",
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
            "priceUsd": "461502",
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
            "collateralBaseApr": "7673414060802878",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "20314718031888000",
            "debtPrograms": [],
            "liquidity": "582399961350619598011489",
            "tvl": "1222399841894391242219310",
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
            "priceUsd": "999863",
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
            "collateralBaseApr": "23151081328114953",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "62722908400608000",
            "debtPrograms": [],
            "liquidity": "936773532621",
            "tvl": "1656066339701",
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
            "priceUsd": "2137581465",
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
            "tvl": "336191608674326450751",
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
            "priceUsd": "2137421500",
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
            "collateralBaseApr": "63609067540570205",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "79395673686192000",
            "debtPrograms": [],
            "liquidity": "10245678859430096206",
            "tvl": "178333168256985887622",
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
            "priceUsd": "84538710946",
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
            "collateralBaseApr": "10535056891104497",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "27520749598320000",
            "debtPrograms": [],
            "liquidity": "3058194628667033368",
            "tvl": "5612312759703062561",
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
            "priceUsd": "84962420522",
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
            "collateralBaseApr": "4842019606065755",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "18657640747152000",
            "debtPrograms": [],
            "liquidity": "3291206602608551281",
            "tvl": "4739473689881522643",
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
            "priceUsd": "519",
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
            "tvl": "152839774755614369451289713",
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
            "priceUsd": "999863",
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
            "collateralBaseApr": "72850053510869717",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "117687491072496000",
            "debtPrograms": [],
            "liquidity": "11701660526",
            "tvl": "37494157851",
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
            "priceUsd": "467240",
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
            "collateralBaseApr": "18761005852746799",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "42571444640544000",
            "debtPrograms": [],
            "liquidity": "47846037334987374161669",
            "tvl": "99695134295622855814417",
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
            "priceUsd": "461502",
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
            "collateralBaseApr": "21266979482675075",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "45325662550416000",
            "debtPrograms": [],
            "liquidity": "53419517822620996398274",
            "tvl": "119241229067552405101647",
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
            "priceUsd": "84893010000",
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
            "collateralBaseApr": "4345587772779632",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "22363230744720000",
            "debtPrograms": [],
            "liquidity": "12263501",
            "tvl": "15897924",
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
            "priceUsd": "84893010000",
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
            "collateralBaseApr": "12321564583004895",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "37657357342848000",
            "debtPrograms": [],
            "liquidity": "10093350",
            "tvl": "16968700",
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
            "priceUsd": "84893010000",
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
            "priceUsd": "84893010000",
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
            "liquidity": "3575",
            "tvl": "3575",
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
