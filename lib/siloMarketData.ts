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
            "priceUsd": "443019",
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
            "collateralBaseApr": "18422904628964207",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "36393990461712000",
            "debtPrograms": [],
            "liquidity": "55247544359771005711269499",
            "tvl": "136622849014643344368540120",
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
            "priceUsd": "437400",
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
            "collateralBaseApr": "59940004530753944",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "77601946908384000",
            "debtPrograms": [],
            "liquidity": "14554809336218989548775850",
            "tvl": "159538713904193277884340875",
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
            "priceUsd": "437400",
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
            "collateralBaseApr": "16137484611413002",
            "collateralPrograms": [
                {
                    "rewardTokenSymbol": "SILO",
                    "apr": "8635294718429960"
                }
            ],
            "protectedPrograms": [],
            "debtBaseApr": "48170765036304000",
            "debtPrograms": [],
            "liquidity": "19915335889871031999206501",
            "tvl": "33409141665438980282274678",
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
            "priceUsd": "999875",
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
            "collateralBaseApr": "28973115379784720",
            "collateralPrograms": [
                {
                    "rewardTokenSymbol": "S",
                    "apr": "56170652553502097"
                },
                {
                    "rewardTokenSymbol": "SILO",
                    "apr": "2497301649045265"
                }
            ],
            "protectedPrograms": [],
            "debtBaseApr": "71239232542320000",
            "debtPrograms": [],
            "liquidity": "38896619211229",
            "tvl": "74606127358994",
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
            "priceUsd": "437400",
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
            "tvl": "45578943980753507274431420",
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
            "priceUsd": "999875",
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
            "collateralBaseApr": "21281769034730945",
            "collateralPrograms": [
                {
                    "rewardTokenSymbol": "S",
                    "apr": "32827422331261797"
                },
                {
                    "rewardTokenSymbol": "SILO",
                    "apr": "8934974789884676"
                }
            ],
            "protectedPrograms": [],
            "debtBaseApr": "59335376591664000",
            "debtPrograms": [],
            "liquidity": "12538126139670",
            "tvl": "20853125727223",
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
            "priceUsd": "441424",
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
            "tvl": "14818214905502151955990709",
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
            "priceUsd": "437400",
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
            "collateralBaseApr": "28615831192073334",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "45357978498768000",
            "debtPrograms": [],
            "liquidity": "4488878248204803670652653",
            "tvl": "17413728220829238302084386",
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
            "priceUsd": "437673",
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
            "liquidity": "3951278472402489936640501",
            "tvl": "13775346319107022517171369",
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
            "priceUsd": "437400",
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
            "collateralBaseApr": "41934754542894267",
            "collateralPrograms": [
                {
                    "rewardTokenSymbol": "SILO",
                    "apr": "17848127290378770"
                },
                {
                    "rewardTokenSymbol": "wOS",
                    "apr": "15833831771352271"
                }
            ],
            "protectedPrograms": [],
            "debtBaseApr": "79051230177840000",
            "debtPrograms": [],
            "liquidity": "6690156466548679160649577",
            "tvl": "17797513246877193889908694",
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
            "priceUsd": "1000725",
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
            "tvl": "3778858441545",
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
            "priceUsd": "999875",
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
            "collateralBaseApr": "80512716763453033",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "115409619365328000",
            "debtPrograms": [],
            "liquidity": "822025635637",
            "tvl": "3656847361096",
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
            "priceUsd": "976922",
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
            "tvl": "13559720792",
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
            "priceUsd": "997292",
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
            "collateralBaseApr": "315822925178",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "245041531776000",
            "debtPrograms": [],
            "liquidity": "7000487186530131515950939",
            "tvl": "7010526686678816356441565",
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
            "priceUsd": "4986557",
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
            "tvl": "544960156100857864127850",
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
            "priceUsd": "999875",
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
            "collateralBaseApr": "122584525590399408",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "218337900089184000",
            "debtPrograms": [],
            "liquidity": "316274634029",
            "tvl": "1060630675345",
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
            "priceUsd": "976922",
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
            "tvl": "1656439743811",
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
            "priceUsd": "999875",
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
            "collateralBaseApr": "63684212800756489",
            "collateralPrograms": [
                {
                    "rewardTokenSymbol": "SILO",
                    "apr": "47130859842255172"
                }
            ],
            "protectedPrograms": [],
            "debtBaseApr": "125397350983440000",
            "debtPrograms": [],
            "liquidity": "834844846376",
            "tvl": "1916047965723",
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
            "priceUsd": "1841885391",
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
            "tvl": "822091633333862697845",
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
            "priceUsd": "1868702531",
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
            "collateralBaseApr": "39866703576516697",
            "collateralPrograms": [
                {
                    "rewardTokenSymbol": "SILO",
                    "apr": "31375333518818449"
                }
            ],
            "protectedPrograms": [],
            "debtBaseApr": "53537194279584000",
            "debtPrograms": [],
            "liquidity": "95432585635191970035",
            "tvl": "770014545654348381368",
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
            "priceUsd": "437400",
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
            "collateralBaseApr": "6389587049598485",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "18537570738432000",
            "debtPrograms": [],
            "liquidity": "723379979196708223000571",
            "tvl": "1392046647046763007933985",
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
            "priceUsd": "999875",
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
            "collateralBaseApr": "24420137090935556",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "64419113220480000",
            "debtPrograms": [],
            "liquidity": "883698687637",
            "tvl": "1595361631405",
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
            "priceUsd": "437400",
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
            "collateralBaseApr": "43235054538872976",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "64626283296000000",
            "debtPrograms": [],
            "liquidity": "155825063509922466381025",
            "tvl": "731779642712949749596374",
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
            "priceUsd": "1868702531",
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
            "collateralBaseApr": "1142087575706458",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "9061502994000000",
            "debtPrograms": [],
            "liquidity": "612463632076370523804",
            "tvl": "778181801131731896820",
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
            "priceUsd": "1869065994",
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
            "tvl": "324976687260736820908",
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
            "priceUsd": "1868702531",
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
            "collateralBaseApr": "74887911500604863",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "93220474940784000",
            "debtPrograms": [],
            "liquidity": "9349795408806513648",
            "tvl": "187289969864225944742",
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
            "priceUsd": "81393229873",
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
            "collateralBaseApr": "10538608231435113",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "27525818600352000",
            "debtPrograms": [],
            "liquidity": "3058101516371430212",
            "tvl": "5612840393951302845",
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
            "priceUsd": "81735766008",
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
            "collateralBaseApr": "4865058460549796",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "18702213855696000",
            "debtPrograms": [],
            "liquidity": "3280587021803619251",
            "tvl": "4729097284337856070",
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
            "priceUsd": "443019",
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
            "collateralBaseApr": "0",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "31536000",
            "debtPrograms": [],
            "liquidity": "24819432533173966651162",
            "tvl": "24819432533173966651162",
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
            "priceUsd": "999875",
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
            "collateralBaseApr": "310769549236638",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "6613464449952000",
            "debtPrograms": [],
            "liquidity": "94797799753",
            "tvl": "100020003226",
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
            "priceUsd": "492",
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
            "tvl": "155603105729528590084288306",
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
            "priceUsd": "999875",
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
            "collateralBaseApr": "49015134095357700",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "96534479808864000",
            "debtPrograms": [],
            "liquidity": "13452189315",
            "tvl": "30879075500",
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
            "priceUsd": "443019",
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
            "collateralBaseApr": "10217596462072708",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "31417057781712000",
            "debtPrograms": [],
            "liquidity": "51905433982754129497326",
            "tvl": "84173079094585806669988",
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
            "priceUsd": "437400",
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
            "collateralBaseApr": "37548697246148627",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "60226671117168000",
            "debtPrograms": [],
            "liquidity": "22248097452972032940203",
            "tvl": "83475649149986403291402",
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
            "priceUsd": "82023407761",
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
            "collateralBaseApr": "4965377270633848",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "23905079585136000",
            "debtPrograms": [],
            "liquidity": "14628463",
            "tvl": "19359225",
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
            "priceUsd": "82023407761",
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
            "collateralBaseApr": "6080023283714937",
            "collateralPrograms": [],
            "protectedPrograms": [],
            "debtBaseApr": "26452587687408000",
            "debtPrograms": [],
            "liquidity": "17529263",
            "tvl": "24584343",
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
            "priceUsd": "82023407761",
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
            "priceUsd": "82023407761",
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
