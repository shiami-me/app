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
            "priceUsd": "541434",
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
            "collateralBaseApr": "17388171416989022",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "35357174357184000",
            "debtPrograms": [],
            "liquidity": "66668677923104995168805962",
            "tvl": "158227136316942992655721642",
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
            "priceUsd": "534429",
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
            "collateralBaseApr": "67895834121196204",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "87650412005952000",
            "debtPrograms": [],
            "liquidity": "15557043170524541145506761",
            "tvl": "175529929571007233774707198",
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
            "priceUsd": "534429",
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
            "collateralBaseApr": "17542085028597839",
            "collateralPrograms": [
                {
                    "rewardTokenSymbol": "SILO",
                    "apr": "7447890841952246"
                }
            ],
            "protectedPrograms": [],
            "debtBaseApr": "50223398810544000",
            "debtPrograms": [],
            "liquidity": "18830893641591565812636327",
            "tvl": "32459731592338019087781248",
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
            "priceUsd": "999964",
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
            "collateralBaseApr": "29600677601797918",
            "collateralPrograms": [
                {
                    "rewardTokenSymbol": "S",
                    "apr": "63333235594818943"
                },
                {
                    "rewardTokenSymbol": "SILO",
                    "apr": "2361788666290839"
                }
            ],
            "protectedPrograms": [],
            "debtBaseApr": "72006587781120000",
            "debtPrograms": [],
            "liquidity": "41730024048053",
            "tvl": "80838013841919",
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
            "priceUsd": "534429",
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
            "tvl": "45991790001137527000608107",
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
            "priceUsd": "999964",
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
            "collateralBaseApr": "27256980571128744",
            "collateralPrograms": [
                {
                    "rewardTokenSymbol": "S",
                    "apr": "43714343918000812"
                },
                {
                    "rewardTokenSymbol": "SILO",
                    "apr": "9979949350462461"
                }
            ],
            "protectedPrograms": [],
            "debtBaseApr": "67150401430896000",
            "debtPrograms": [],
            "liquidity": "10499335884373",
            "tvl": "19132461405599",
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
            "priceUsd": "539639",
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
            "liquidity": "417159456000733773985070",
            "tvl": "15339450738473893891339051",
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
            "priceUsd": "534429",
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
            "collateralBaseApr": "31345070735999743",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "47471714692128000",
            "debtPrograms": [],
            "liquidity": "3848722700058357474235766",
            "tvl": "17244237042229887732447995",
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
            "priceUsd": "532884",
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
            "liquidity": "3897552742791022142704847",
            "tvl": "11910681182232268277642661",
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
            "priceUsd": "534429",
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
            "collateralBaseApr": "35983164987241819",
            "collateralPrograms": [
                {
                    "rewardTokenSymbol": "wOS",
                    "apr": "16188461449099171"
                },
                {
                    "rewardTokenSymbol": "SILO",
                    "apr": "15359898295929053"
                }
            ],
            "protectedPrograms": [],
            "debtBaseApr": "73226991214224000",
            "debtPrograms": [],
            "liquidity": "7318201064464652577691761",
            "tvl": "17346492483608471903858663",
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
            "priceUsd": "83862360000",
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
            "collateralBaseApr": "51375377443206070",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "76894510290336000",
            "debtPrograms": [],
            "liquidity": "1207306919",
            "tvl": "5642490496",
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
            "priceUsd": "83862360000",
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
            "collateralBaseApr": "196540431486759",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "4756021612416000",
            "debtPrograms": [],
            "liquidity": "9387617164",
            "tvl": "9867896931",
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
            "priceUsd": "980273",
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
            "tvl": "1785286116142",
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
            "priceUsd": "998111",
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
            "collateralBaseApr": "3832630781987025",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "26993818926288000",
            "debtPrograms": [],
            "liquidity": "7333364798183800900244927",
            "tvl": "8706952218204749138655414",
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
            "priceUsd": "1001052",
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
            "liquidity": "898770719",
            "tvl": "3724756672168",
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
            "priceUsd": "999964",
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
            "collateralBaseApr": "90661975623648433",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "122467943750256000",
            "debtPrograms": [],
            "liquidity": "600170287569",
            "tvl": "3383319067029",
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
            "priceUsd": "5640544",
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
            "liquidity": "4850270869045041",
            "tvl": "585908592996327022052420",
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
            "priceUsd": "999964",
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
            "collateralBaseApr": "118980418770044219",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "215104062729024000",
            "debtPrograms": [],
            "liquidity": "353539151221",
            "tvl": "1145667084113",
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
            "priceUsd": "534429",
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
            "collateralBaseApr": "3018043409960590",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "12740287896144000",
            "debtPrograms": [],
            "liquidity": "892142842989377294335007",
            "tvl": "1412083449878635513577273",
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
            "priceUsd": "999964",
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
            "collateralBaseApr": "5232838638351541",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "29820135732336000",
            "debtPrograms": [],
            "liquidity": "2895455602898",
            "tvl": "3651322195749",
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
            "priceUsd": "1900479810",
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
            "tvl": "807797154793594766859",
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
            "priceUsd": "1925060881",
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
            "collateralBaseApr": "38872716325585119",
            "collateralPrograms": [
                {
                    "rewardTokenSymbol": "SILO",
                    "apr": "31374194825687787"
                }
            ],
            "protectedPrograms": [],
            "debtBaseApr": "52865580350016000",
            "debtPrograms": [],
            "liquidity": "103363457576889571097",
            "tvl": "766071767457944612577",
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
            "priceUsd": "980273",
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
            "tvl": "687081914765",
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
            "priceUsd": "999964",
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
            "collateralBaseApr": "19664902814015176",
            "collateralPrograms": [
                {
                    "rewardTokenSymbol": "SILO",
                    "apr": "76237570732340593"
                }
            ],
            "protectedPrograms": [],
            "debtBaseApr": "69681632415984000",
            "debtPrograms": [],
            "liquidity": "833222451401",
            "tvl": "1213844616301",
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
            "priceUsd": "534429",
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
            "collateralBaseApr": "39769945965794577",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "61982460906912000",
            "debtPrograms": [],
            "liquidity": "173033778656927091045113",
            "tvl": "705861254214024369502563",
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
            "priceUsd": "1925060881",
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
            "collateralBaseApr": "1259915490197862",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "9517464074016000",
            "debtPrograms": [],
            "liquidity": "590221747142880252857",
            "tvl": "758191947552440334774",
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
            "priceUsd": "1925555217",
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
            "tvl": "352463255158531651145",
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
            "priceUsd": "1925060881",
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
            "collateralBaseApr": "78414370398092768",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "98902036841040000",
            "debtPrograms": [],
            "liquidity": "12908203272062804586",
            "tvl": "208940739556364863633",
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
            "priceUsd": "83517697705",
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
            "collateralBaseApr": "10539636806978698",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "27525818600352000",
            "debtPrograms": [],
            "liquidity": "3058042054769356124",
            "tvl": "5613177344889545528",
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
            "priceUsd": "83885948308",
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
            "collateralBaseApr": "4865800547561654",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "18703630295136000",
            "debtPrograms": [],
            "liquidity": "3280576522389334756",
            "tvl": "4729242252115025646",
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
            "priceUsd": "541434",
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
            "collateralBaseApr": "433453099394",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "171557574480000",
            "debtPrograms": [],
            "liquidity": "88803452064158332687932",
            "tvl": "89053452327530666347234",
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
            "priceUsd": "999964",
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
            "collateralBaseApr": "1555989391815932",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "14798290768992000",
            "debtPrograms": [],
            "liquidity": "88644087177",
            "tvl": "100370300490",
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
            "priceUsd": "522454",
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
            "tvl": "7964691022413913289821",
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
            "priceUsd": "534429",
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
            "collateralBaseApr": "41698845301498",
            "collateralPrograms": [
                {
                    "rewardTokenSymbol": "SILO",
                    "apr": "657823681448763498"
                }
            ],
            "protectedPrograms": [],
            "debtBaseApr": "2263576722192000",
            "debtPrograms": [],
            "liquidity": "249207319245585137011382",
            "tvl": "254727921207942614982542",
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
            "priceUsd": "602",
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
            "tvl": "176315751941430823288622664",
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
            "priceUsd": "999964",
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
            "collateralBaseApr": "75655300350840658",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "119932623428976000",
            "debtPrograms": [],
            "liquidity": "8035841361",
            "tvl": "26881072932",
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
            "priceUsd": "541434",
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
            "collateralBaseApr": "17900996091742572",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "41584357654416000",
            "debtPrograms": [],
            "liquidity": "51314596195569617045835",
            "tvl": "104068132278815520195350",
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
            "priceUsd": "534429",
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
            "collateralBaseApr": "37669036706484092",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "60323109624288000",
            "debtPrograms": [],
            "liquidity": "26266808383358476222429",
            "tvl": "98990164741204801164542",
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
            "priceUsd": "83862360000",
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
            "priceUsd": "83862360000",
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
            "liquidity": "54514",
            "tvl": "54514",
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