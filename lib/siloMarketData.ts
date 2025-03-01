// This file contains the hardcoded market data
// The dynamic values (liquidity, collateralBaseApr, debtBaseApr, maxLtv, lt) will be updated using SiloLens

export const siloMarketData = [
  {
    protocolKey: "sonic",
    id: "3",
    isVerified: true,
    configAddress: "0x78C246f67c8A6cE03a1d894d4Cf68004Bd55Deea",
    boostedContentKey: null,
    silo0: {
      tokenAddress: "0xE5DA20F15420aD15DE0fa650600aFc998bbE3955",
      symbol: "stS",
      name: "Beets Staked Sonic",
      logos: {
        trustWallet: null,
        coinMarketCap: null,
        coinGecko: {
          small:
            "https://coin-images.coingecko.com/coins/images/52937/small/token-beets-staked-sonic.png?1734712659",
          large:
            "https://coin-images.coingecko.com/coins/images/52937/large/token-beets-staked-sonic.png?1734712659",
        },
      },
      decimals: 18,
      priceUsd: "745008",
      maxLtv: "950000000000000000",
      lt: "970000000000000000",
      solvencyOracle: {
        address: "0xBDc15b6aaC4e7b4685A2d199bBfa8876730982F2",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      maxLtvOracle: {
        address: "0xBDc15b6aaC4e7b4685A2d199bBfa8876730982F2",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      collateralBaseApr: "20404513583726723",
      collateralPrograms: [],
      protectedPrograms: [],
      debtBaseApr: "38301313222800000",
      debtPrograms: [],
      liquidity: "42481452716266392481307835",
      tvl: "113858981046785077204881822",
      isNonBorrowable: false,
      collateralPoints: [
        {
          _tag: "sonic",
          multiplier: 8,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 1,
        },
      ],
      protectedPoints: [
        {
          _tag: "sonic",
          multiplier: 8,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 1,
        },
      ],
      debtPoints: [
        {
          _tag: "silo",
          basePoints: 0.5,
          multiplier: 1,
        },
      ],
      oracleLabel: "RedStone",
      oracleContentKey: "sonic-sts-s-3",
    },
    silo1: {
      tokenAddress: "0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38",
      symbol: "S",
      name: "Sonic",
      logos: {
        trustWallet: null,
        coinMarketCap: null,
        coinGecko: {
          small:
            "https://coin-images.coingecko.com/coins/images/52857/small/wrapped_sonic.png?1734536585",
          large:
            "https://coin-images.coingecko.com/coins/images/52857/large/wrapped_sonic.png?1734536585",
        },
      },
      decimals: 18,
      priceUsd: "736624",
      maxLtv: "950000000000000000",
      lt: "970000000000000000",
      solvencyOracle: {
        address: "0x0000000000000000000000000000000000000000",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      maxLtvOracle: {
        address: "0x0000000000000000000000000000000000000000",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      collateralBaseApr: "35714574170800109",
      collateralPrograms: [],
      protectedPrograms: [],
      debtBaseApr: "50672614056336000",
      debtPrograms: [],
      liquidity: "22948160850618283359297917",
      tvl: "134356101966680218502114536",
      isNonBorrowable: false,
      collateralPoints: [
        {
          _tag: "sonic",
          multiplier: 8,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 2,
        },
      ],
      protectedPoints: [
        {
          _tag: "sonic",
          multiplier: 8,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 2,
        },
      ],
      debtPoints: [
        {
          _tag: "silo",
          basePoints: 0.5,
          multiplier: 1,
        },
      ],
      oracleLabel: "RedStone",
      oracleContentKey: "sonic-sts-s-3",
    },
  },
  {
    protocolKey: "sonic",
    id: "8",
    isVerified: true,
    configAddress: "0x4915F6d3C9a7B20CedFc5d3854f2802f30311d13",
    boostedContentKey: null,
    silo0: {
      tokenAddress: "0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38",
      symbol: "S",
      name: "Sonic",
      logos: {
        trustWallet: null,
        coinMarketCap: null,
        coinGecko: {
          small:
            "https://coin-images.coingecko.com/coins/images/52857/small/wrapped_sonic.png?1734536585",
          large:
            "https://coin-images.coingecko.com/coins/images/52857/large/wrapped_sonic.png?1734536585",
        },
      },
      decimals: 18,
      priceUsd: "736624",
      maxLtv: "750000000000000000",
      lt: "800000000000000000",
      solvencyOracle: {
        address: "0x7bd2a4820abf7F8708c0ce57a03e615956bF2f3A",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      maxLtvOracle: {
        address: "0x7bd2a4820abf7F8708c0ce57a03e615956bF2f3A",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      collateralBaseApr: "0",
      collateralPrograms: [],
      protectedPrograms: [],
      debtBaseApr: "31536000",
      debtPrograms: [],
      liquidity: "1000000000000000000",
      tvl: "116101732756164758362843684",
      isNonBorrowable: true,
      collateralPoints: [
        {
          _tag: "sonic",
          multiplier: 8,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 1,
        },
      ],
      protectedPoints: [
        {
          _tag: "sonic",
          multiplier: 8,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 1,
        },
      ],
      debtPoints: [
        {
          _tag: "silo",
          basePoints: 0.5,
          multiplier: 1,
        },
      ],
      oracleLabel: "Chainlink",
      oracleContentKey: "sonic-8-s",
    },
    silo1: {
      tokenAddress: "0x29219dd400f2Bf60E5a23d13Be72B486D4038894",
      symbol: "USDC",
      name: "Bridged USDC (Sonic Labs)",
      logos: {
        trustWallet: null,
        coinMarketCap: null,
        coinGecko: {
          small:
            "https://coin-images.coingecko.com/coins/images/53064/small/logo.png?1735179479",
          large:
            "https://coin-images.coingecko.com/coins/images/53064/large/logo.png?1735179479",
        },
      },
      decimals: 6,
      priceUsd: "999964",
      maxLtv: "0",
      lt: "0",
      solvencyOracle: {
        address: "0x44bd4BfD2a361EAa7D905935Cc59D8849639C77D",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      maxLtvOracle: {
        address: "0x44bd4BfD2a361EAa7D905935Cc59D8849639C77D",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      collateralBaseApr: "67685154225004832",
      collateralPrograms: [
        {
          rewardTokenSymbol: "S",
          apr: "47822094613336763",
        },
        {
          rewardTokenSymbol: "SILO",
          apr: "8129828234331062",
        },
      ],
      protectedPrograms: [],
      debtBaseApr: "105817281258672000",
      debtPrograms: [],
      liquidity: "9410474791320",
      tvl: "32538325209708",
      isNonBorrowable: false,
      collateralPoints: [
        {
          _tag: "sonic",
          multiplier: 10,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 1,
        },
      ],
      protectedPoints: [
        {
          _tag: "sonic",
          multiplier: 10,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 1,
        },
      ],
      debtPoints: [
        {
          _tag: "silo",
          basePoints: 0.5,
          multiplier: 2,
        },
      ],
      oracleLabel: "Chainlink",
      oracleContentKey: "sonic-8-usdc",
    },
  },
  {
    protocolKey: "sonic",
    id: "20",
    isVerified: true,
    configAddress: "0x062A36Bbe0306c2Fd7aecdf25843291fBAB96AD2",
    boostedContentKey: null,
    silo0: {
      tokenAddress: "0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38",
      symbol: "S",
      name: "Sonic",
      logos: {
        trustWallet: null,
        coinMarketCap: null,
        coinGecko: {
          small:
            "https://coin-images.coingecko.com/coins/images/52857/small/wrapped_sonic.png?1734536585",
          large:
            "https://coin-images.coingecko.com/coins/images/52857/large/wrapped_sonic.png?1734536585",
        },
      },
      decimals: 18,
      priceUsd: "736624",
      maxLtv: "750000000000000000",
      lt: "800000000000000000",
      solvencyOracle: {
        address: "0x5dA3510D19059394DAf8A5C0f50B0f6aBea9F4C5",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      maxLtvOracle: {
        address: "0x5dA3510D19059394DAf8A5C0f50B0f6aBea9F4C5",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      collateralBaseApr: "9114140349980385",
      collateralPrograms: [
        {
          rewardTokenSymbol: "SILO",
          apr: "10421173788039054",
        },
      ],
      protectedPrograms: [],
      debtBaseApr: "36201232495872000",
      debtPrograms: [],
      liquidity: "16164001440165936093532625",
      tvl: "23071004585530907599213893",
      isNonBorrowable: false,
      collateralPoints: [
        {
          _tag: "sonic",
          multiplier: 8,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 2,
        },
      ],
      protectedPoints: [
        {
          _tag: "sonic",
          multiplier: 8,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 2,
        },
      ],
      debtPoints: [
        {
          _tag: "silo",
          basePoints: 0.5,
          multiplier: 1,
        },
      ],
      oracleLabel: "Chainlink",
      oracleContentKey: "sonic-8-s",
    },
    silo1: {
      tokenAddress: "0x29219dd400f2Bf60E5a23d13Be72B486D4038894",
      symbol: "USDC",
      name: "Bridged USDC (Sonic Labs)",
      logos: {
        trustWallet: null,
        coinMarketCap: null,
        coinGecko: {
          small:
            "https://coin-images.coingecko.com/coins/images/53064/small/logo.png?1735179479",
          large:
            "https://coin-images.coingecko.com/coins/images/53064/large/logo.png?1735179479",
        },
      },
      decimals: 6,
      priceUsd: "999964",
      maxLtv: "750000000000000000",
      lt: "800000000000000000",
      solvencyOracle: {
        address: "0x688951Ad1FAfb55484Fd4a3f867aacA88B0Bfa4c",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      maxLtvOracle: {
        address: "0x688951Ad1FAfb55484Fd4a3f867aacA88B0Bfa4c",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      collateralBaseApr: "53331766731677455",
      collateralPrograms: [
        {
          rewardTokenSymbol: "S",
          apr: "57408138939378944",
        },
        {
          rewardTokenSymbol: "SILO",
          apr: "4182630099598986",
        },
      ],
      protectedPrograms: [],
      debtBaseApr: "96652806349824000",
      debtPrograms: [],
      liquidity: "22183100145960",
      tvl: "63250567258706",
      isNonBorrowable: false,
      collateralPoints: [
        {
          _tag: "sonic",
          multiplier: 10,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 1,
        },
      ],
      protectedPoints: [
        {
          _tag: "sonic",
          multiplier: 10,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 1,
        },
      ],
      debtPoints: [
        {
          _tag: "silo",
          basePoints: 0.5,
          multiplier: 1,
        },
      ],
      oracleLabel: "Chainlink",
      oracleContentKey: "sonic-8-usdc",
    },
  },
  {
    protocolKey: "sonic",
    id: "22",
    isVerified: true,
    configAddress: "0x1A030F39a8cf9f0b2649e97cF6d0C7853AeaCf78",
    boostedContentKey: null,
    silo0: {
      tokenAddress: "0x9F0dF7799f6FDAd409300080cfF680f5A23df4b1",
      symbol: "wOS",
      name: "Wrapped OS",
      logos: {
        trustWallet: null,
        coinMarketCap: null,
        coinGecko: {
          small:
            "https://coin-images.coingecko.com/coins/images/53774/small/wos-256x256.png?1737271865",
          large:
            "https://coin-images.coingecko.com/coins/images/53774/large/wos-256x256.png?1737271865",
        },
      },
      decimals: 18,
      priceUsd: "734058",
      maxLtv: "900000000000000000",
      lt: "950000000000000000",
      solvencyOracle: {
        address: "0xa2b8895817009054a12a2Ae41256E9FD39B5FF67",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      maxLtvOracle: {
        address: "0xa2b8895817009054a12a2Ae41256E9FD39B5FF67",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      collateralBaseApr: "0",
      collateralPrograms: [],
      protectedPrograms: [],
      debtBaseApr: "31536000",
      debtPrograms: [],
      liquidity: "575683166390919833695078",
      tvl: "3400150826624530940621270",
      isNonBorrowable: true,
      collateralPoints: [
        {
          _tag: "sonic",
          multiplier: 8,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 1,
        },
      ],
      protectedPoints: [
        {
          _tag: "sonic",
          multiplier: 8,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 1,
        },
      ],
      debtPoints: [
        {
          _tag: "silo",
          basePoints: 0.5,
          multiplier: 1,
        },
      ],
      oracleLabel: "Custom Oracle",
      oracleContentKey: "sonic-22-wos",
    },
    silo1: {
      tokenAddress: "0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38",
      symbol: "S",
      name: "Sonic",
      logos: {
        trustWallet: null,
        coinMarketCap: null,
        coinGecko: {
          small:
            "https://coin-images.coingecko.com/coins/images/52857/small/wrapped_sonic.png?1734536585",
          large:
            "https://coin-images.coingecko.com/coins/images/52857/large/wrapped_sonic.png?1734536585",
        },
      },
      decimals: 18,
      priceUsd: "736624",
      maxLtv: "0",
      lt: "0",
      solvencyOracle: {
        address: "0x0000000000000000000000000000000000000000",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      maxLtvOracle: {
        address: "0x0000000000000000000000000000000000000000",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      collateralBaseApr: "5017376844911803",
      collateralPrograms: [
        {
          rewardTokenSymbol: "wOS",
          apr: "25579195857778448",
        },
        {
          rewardTokenSymbol: "SILO",
          apr: "24412371832705515",
        },
      ],
      protectedPrograms: [],
      debtBaseApr: "27343869945408000",
      debtPrograms: [],
      liquidity: "8603011326437757587377259",
      tvl: "10971777913903912813359279",
      isNonBorrowable: false,
      collateralPoints: [
        {
          _tag: "sonic",
          multiplier: 8,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 2,
        },
      ],
      protectedPoints: [
        {
          _tag: "sonic",
          multiplier: 8,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 2,
        },
      ],
      debtPoints: [
        {
          _tag: "silo",
          basePoints: 0.5,
          multiplier: 1,
        },
      ],
      oracleLabel: null,
      oracleContentKey: "sonic-22-s",
    },
  },
  {
    protocolKey: "sonic",
    id: "9",
    isVerified: true,
    configAddress: "0x9603Af53dC37F4BB6386f358A51a04fA8f599101",
    boostedContentKey: null,
    silo0: {
      tokenAddress: "0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38",
      symbol: "S",
      name: "Sonic",
      logos: {
        trustWallet: null,
        coinMarketCap: null,
        coinGecko: {
          small:
            "https://coin-images.coingecko.com/coins/images/52857/small/wrapped_sonic.png?1734536585",
          large:
            "https://coin-images.coingecko.com/coins/images/52857/large/wrapped_sonic.png?1734536585",
        },
      },
      decimals: 18,
      priceUsd: "736624",
      maxLtv: "800000000000000000",
      lt: "850000000000000000",
      solvencyOracle: {
        address: "0x7bd2a4820abf7F8708c0ce57a03e615956bF2f3A",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      maxLtvOracle: {
        address: "0x7bd2a4820abf7F8708c0ce57a03e615956bF2f3A",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      collateralBaseApr: "8151249518470081",
      collateralPrograms: [],
      protectedPrograms: [],
      debtBaseApr: "28060995305664000",
      debtPrograms: [],
      liquidity: "3078114358572400832641749",
      tvl: "4676173272890810295699623",
      isNonBorrowable: false,
      collateralPoints: [
        {
          _tag: "sonic",
          multiplier: 8,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 1,
        },
      ],
      protectedPoints: [
        {
          _tag: "sonic",
          multiplier: 8,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 1,
        },
      ],
      debtPoints: [
        {
          _tag: "silo",
          basePoints: 0.5,
          multiplier: 2,
        },
      ],
      oracleLabel: "Chainlink",
      oracleContentKey: "sonic-9-s",
    },
    silo1: {
      tokenAddress: "0x50c42dEAcD8Fc9773493ED674b675bE577f2634b",
      symbol: "ETH",
      name: "Ether",
      logos: {
        trustWallet: null,
        coinMarketCap: null,
        coinGecko: {
          small:
            "https://coin-images.coingecko.com/coins/images/53332/small/weth_2.jpg?1736149977",
          large:
            "https://coin-images.coingecko.com/coins/images/53332/large/weth_2.jpg?1736149977",
        },
      },
      decimals: 18,
      priceUsd: "2228736000",
      maxLtv: "800000000000000000",
      lt: "850000000000000000",
      solvencyOracle: {
        address: "0xed4399235f377AFB48dA005607a0F52Ed7C3bC7F",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      maxLtvOracle: {
        address: "0xed4399235f377AFB48dA005607a0F52Ed7C3bC7F",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      collateralBaseApr: "146107125382397",
      collateralPrograms: [],
      protectedPrograms: [],
      debtBaseApr: "3241053333072000",
      debtPrograms: [],
      liquidity: "1702875016805879493446",
      tvl: "1880717763177698759043",
      isNonBorrowable: false,
      collateralPoints: [
        {
          _tag: "sonic",
          multiplier: 4,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 1,
        },
      ],
      protectedPoints: [
        {
          _tag: "sonic",
          multiplier: 4,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 1,
        },
      ],
      debtPoints: [
        {
          _tag: "silo",
          basePoints: 0.5,
          multiplier: 2,
        },
      ],
      oracleLabel: "Chainlink",
      oracleContentKey: "sonic-9-eth",
    },
  },
  {
    protocolKey: "sonic",
    id: "15",
    isVerified: true,
    configAddress: "0xFe514E71F0933F63B374056557AED3dBB381C646",
    boostedContentKey: null,
    silo0: {
      tokenAddress: "0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38",
      symbol: "S",
      name: "Sonic",
      logos: {
        trustWallet: null,
        coinMarketCap: null,
        coinGecko: {
          small:
            "https://coin-images.coingecko.com/coins/images/52857/small/wrapped_sonic.png?1734536585",
          large:
            "https://coin-images.coingecko.com/coins/images/52857/large/wrapped_sonic.png?1734536585",
        },
      },
      decimals: 18,
      priceUsd: "736624",
      maxLtv: "750000000000000000",
      lt: "800000000000000000",
      solvencyOracle: {
        address: "0x5dA3510D19059394DAf8A5C0f50B0f6aBea9F4C5",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      maxLtvOracle: {
        address: "0x5dA3510D19059394DAf8A5C0f50B0f6aBea9F4C5",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      collateralBaseApr: "178928632567908",
      collateralPrograms: [],
      protectedPrograms: [],
      debtBaseApr: "3102104203344000",
      debtPrograms: [],
      liquidity: "6036014907971135708299333",
      tvl: "6646756600550087215293689",
      isNonBorrowable: false,
      collateralPoints: [
        {
          _tag: "sonic",
          multiplier: 8,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 1,
        },
      ],
      protectedPoints: [
        {
          _tag: "sonic",
          multiplier: 8,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 1,
        },
      ],
      debtPoints: [
        {
          _tag: "silo",
          basePoints: 0.5,
          multiplier: 2,
        },
      ],
      oracleLabel: "Chainlink",
      oracleContentKey: "sonic-15-s",
    },
    silo1: {
      tokenAddress: "0xd3DCe716f3eF535C5Ff8d041c1A41C3bd89b97aE",
      symbol: "scUSD",
      name: "Sonic USD",
      logos: {
        trustWallet: null,
        coinMarketCap: null,
        coinGecko: {
          small:
            "https://coin-images.coingecko.com/coins/images/53456/small/scusd_%281%29.png?1736404738",
          large:
            "https://coin-images.coingecko.com/coins/images/53456/large/scusd_%281%29.png?1736404738",
        },
      },
      decimals: 6,
      priceUsd: "999964",
      maxLtv: "700000000000000000",
      lt: "750000000000000000",
      solvencyOracle: {
        address: "0xe809B55E3f67B1F808dF6131ee2D23525D6d350e",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      maxLtvOracle: {
        address: "0xe809B55E3f67B1F808dF6131ee2D23525D6d350e",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      collateralBaseApr: "47938830953930587",
      collateralPrograms: [],
      protectedPrograms: [],
      debtBaseApr: "90257649166080000",
      debtPrograms: [],
      liquidity: "591379988290",
      tvl: "1576535521460",
      isNonBorrowable: false,
      collateralPoints: [
        {
          _tag: "sonic",
          multiplier: 12,
        },
        {
          _tag: "rings",
          multiplier: 1.5,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 1,
        },
      ],
      protectedPoints: [
        {
          _tag: "sonic",
          multiplier: 12,
        },
        {
          _tag: "rings",
          multiplier: 1.5,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 1,
        },
      ],
      debtPoints: [
        {
          _tag: "silo",
          basePoints: 0.5,
          multiplier: 2,
        },
      ],
      oracleLabel: "RedStone",
      oracleContentKey: "sonic-15-scusd",
    },
  },
  {
    protocolKey: "sonic",
    id: "23",
    isVerified: true,
    configAddress: "0xbC24c0F594ECA381956895957c771437D61400D3",
    boostedContentKey: null,
    silo0: {
      tokenAddress: "0x9fb76f7ce5FCeAA2C42887ff441D46095E494206",
      symbol: "wstkscUSD",
      name: "Wrapped stkscUSD",
      logos: {
        trustWallet: null,
        coinMarketCap: null,
        coinGecko: null,
      },
      decimals: 6,
      priceUsd: "999964",
      maxLtv: "900000000000000000",
      lt: "950000000000000000",
      solvencyOracle: {
        address: "0x7B4dEeb8CAa661247bD2d6a1295e4EeFA96Fd950",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      maxLtvOracle: {
        address: "0x7B4dEeb8CAa661247bD2d6a1295e4EeFA96Fd950",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      collateralBaseApr: "0",
      collateralPrograms: [],
      protectedPrograms: [],
      debtBaseApr: "31536000",
      debtPrograms: [],
      liquidity: "0",
      tvl: "1894049681935",
      isNonBorrowable: true,
      collateralPoints: [
        {
          _tag: "sonic",
          multiplier: 12,
        },
        {
          _tag: "rings",
          multiplier: 2,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 1,
        },
      ],
      protectedPoints: [
        {
          _tag: "sonic",
          multiplier: 12,
        },
        {
          _tag: "rings",
          multiplier: 2,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 1,
        },
      ],
      debtPoints: [
        {
          _tag: "silo",
          basePoints: 0.5,
          multiplier: 1,
        },
      ],
      oracleLabel: "Pyth + RedStone",
      oracleContentKey: "sonic-23-wstkscUsd",
    },
    silo1: {
      tokenAddress: "0x29219dd400f2Bf60E5a23d13Be72B486D4038894",
      symbol: "USDC",
      name: "Bridged USDC (Sonic Labs)",
      logos: {
        trustWallet: null,
        coinMarketCap: null,
        coinGecko: {
          small:
            "https://coin-images.coingecko.com/coins/images/53064/small/logo.png?1735179479",
          large:
            "https://coin-images.coingecko.com/coins/images/53064/large/logo.png?1735179479",
        },
      },
      decimals: 6,
      priceUsd: "999964",
      maxLtv: "0",
      lt: "0",
      solvencyOracle: {
        address: "0x505A09c978B94Ba6ad3F90c31Ee3e1028C398631",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      maxLtvOracle: {
        address: "0x505A09c978B94Ba6ad3F90c31Ee3e1028C398631",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      collateralBaseApr: "10518346092306182",
      collateralPrograms: [
        {
          rewardTokenSymbol: "S",
          apr: "145836083606027935",
        },
      ],
      protectedPrograms: [],
      debtBaseApr: "41714162826336000",
      debtPrograms: [],
      liquidity: "2843888835088",
      tvl: "3951908463397",
      isNonBorrowable: false,
      collateralPoints: [
        {
          _tag: "sonic",
          multiplier: 10,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 3,
        },
      ],
      protectedPoints: [
        {
          _tag: "sonic",
          multiplier: 10,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 3,
        },
      ],
      debtPoints: [
        {
          _tag: "silo",
          basePoints: 0.5,
          multiplier: 1,
        },
      ],
      oracleLabel: "RedStone",
      oracleContentKey: "sonic-23-usdc",
    },
  },
  {
    protocolKey: "sonic",
    id: "27",
    isVerified: true,
    configAddress: "0xaaF2F78f5eA77bF4EA150E869C54eEb73185a3BF",
    boostedContentKey: null,
    silo0: {
      tokenAddress: "0x79bbF4508B1391af3A0F4B30bb5FC4aa9ab0E07C",
      symbol: "Anon",
      name: "HeyAnon",
      logos: {
        trustWallet: null,
        coinMarketCap: null,
        coinGecko: {
          small:
            "https://coin-images.coingecko.com/coins/images/52961/small/AAI__ANON_SQ_Wb_250x250.png?1740500195",
          large:
            "https://coin-images.coingecko.com/coins/images/52961/large/AAI__ANON_SQ_Wb_250x250.png?1740500195",
        },
      },
      decimals: 18,
      priceUsd: "7885429",
      maxLtv: "550000000000000000",
      lt: "650000000000000000",
      solvencyOracle: {
        address: "0xE764d83193828b7f773b5cB2a04CDd4A0c155ee7",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      maxLtvOracle: {
        address: "0xE764d83193828b7f773b5cB2a04CDd4A0c155ee7",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      collateralBaseApr: "0",
      collateralPrograms: [],
      protectedPrograms: [],
      debtBaseApr: "31536000",
      debtPrograms: [],
      liquidity: "1",
      tvl: "578741976471771510578339",
      isNonBorrowable: true,
      collateralPoints: [
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 1,
        },
      ],
      protectedPoints: [
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 1,
        },
      ],
      debtPoints: [
        {
          _tag: "silo",
          basePoints: 0.5,
          multiplier: 1,
        },
      ],
      oracleLabel: "Pyth",
      oracleContentKey: "sonic-27-ANON",
    },
    silo1: {
      tokenAddress: "0x29219dd400f2Bf60E5a23d13Be72B486D4038894",
      symbol: "USDC",
      name: "Bridged USDC (Sonic Labs)",
      logos: {
        trustWallet: null,
        coinMarketCap: null,
        coinGecko: {
          small:
            "https://coin-images.coingecko.com/coins/images/53064/small/logo.png?1735179479",
          large:
            "https://coin-images.coingecko.com/coins/images/53064/large/logo.png?1735179479",
        },
      },
      decimals: 6,
      priceUsd: "999964",
      maxLtv: "550000000000000000",
      lt: "650000000000000000",
      solvencyOracle: {
        address: "0xA8FAcc4c42522A67FcD2d9Bc1b9f849ca99C34E6",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      maxLtvOracle: {
        address: "0xA8FAcc4c42522A67FcD2d9Bc1b9f849ca99C34E6",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      collateralBaseApr: "148913755556919239",
      collateralPrograms: [],
      protectedPrograms: [],
      debtBaseApr: "240646028990256000",
      debtPrograms: [],
      liquidity: "250165128853",
      tvl: "1104532283900",
      isNonBorrowable: false,
      collateralPoints: [
        {
          _tag: "sonic",
          multiplier: 10,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 1,
        },
      ],
      protectedPoints: [
        {
          _tag: "sonic",
          multiplier: 10,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 1,
        },
      ],
      debtPoints: [
        {
          _tag: "silo",
          basePoints: 0.5,
          multiplier: 1,
        },
      ],
      oracleLabel: "Pyth",
      oracleContentKey: "sonic-27-USDC",
    },
  },
  {
    protocolKey: "sonic",
    id: "26",
    isVerified: true,
    configAddress: "0xefA367570B11f8745B403c0D458b9D2EAf424686",
    boostedContentKey: null,
    silo0: {
      tokenAddress: "0xE8a41c62BB4d5863C6eadC96792cFE90A1f37C47",
      symbol: "wstkscETH",
      name: "Wrapped stkscETH",
      logos: {
        trustWallet: null,
        coinMarketCap: null,
        coinGecko: null,
      },
      decimals: 18,
      priceUsd: "2228736000",
      maxLtv: "850000000000000000",
      lt: "900000000000000000",
      solvencyOracle: {
        address: "0x57517E75aa50C8eaC8b5d8513B86793D893fE7d7",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      maxLtvOracle: {
        address: "0x57517E75aa50C8eaC8b5d8513B86793D893fE7d7",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      collateralBaseApr: "0",
      collateralPrograms: [],
      protectedPrograms: [],
      debtBaseApr: "31536000",
      debtPrograms: [],
      liquidity: "0",
      tvl: "321066355234561025828",
      isNonBorrowable: true,
      collateralPoints: [
        {
          _tag: "sonic",
          multiplier: 8,
        },
        {
          _tag: "rings",
          multiplier: 1.5,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 1,
        },
      ],
      protectedPoints: [
        {
          _tag: "sonic",
          multiplier: 8,
        },
        {
          _tag: "rings",
          multiplier: 1.5,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 1,
        },
      ],
      debtPoints: [
        {
          _tag: "silo",
          basePoints: 0.5,
          multiplier: 1,
        },
      ],
      oracleLabel: "Pyth + RedStone",
      oracleContentKey: "sonic-26-wstkscETH",
    },
    silo1: {
      tokenAddress: "0x50c42dEAcD8Fc9773493ED674b675bE577f2634b",
      symbol: "ETH",
      name: "Ether",
      logos: {
        trustWallet: null,
        coinMarketCap: null,
        coinGecko: {
          small:
            "https://coin-images.coingecko.com/coins/images/53332/small/weth_2.jpg?1736149977",
          large:
            "https://coin-images.coingecko.com/coins/images/53332/large/weth_2.jpg?1736149977",
        },
      },
      decimals: 18,
      priceUsd: "2228736000",
      maxLtv: "0",
      lt: "0",
      solvencyOracle: {
        address: "0x0000000000000000000000000000000000000000",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      maxLtvOracle: {
        address: "0x0000000000000000000000000000000000000000",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      collateralBaseApr: "25794746662698506",
      collateralPrograms: [],
      protectedPrograms: [],
      debtBaseApr: "43064106055920000",
      debtPrograms: [],
      liquidity: "62082941388929454324",
      tvl: "213228338867550784902",
      isNonBorrowable: false,
      collateralPoints: [
        {
          _tag: "sonic",
          multiplier: 4,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 3,
        },
      ],
      protectedPoints: [
        {
          _tag: "sonic",
          multiplier: 4,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 3,
        },
      ],
      debtPoints: [
        {
          _tag: "silo",
          basePoints: 0.5,
          multiplier: 1,
        },
      ],
      oracleLabel: "RedStone",
      oracleContentKey: "sonic-26-ETH",
    },
  },
  {
    protocolKey: "sonic",
    id: "13",
    isVerified: true,
    configAddress: "0xC1F3d4F5f734d6Dc9E7D4f639EbE489Acd4542ab",
    boostedContentKey: null,
    silo0: {
      tokenAddress: "0xCC0966D8418d412c599A6421b760a847eB169A8c",
      symbol: "SolvBTC.BBN",
      name: "SolvBTC Babylon",
      logos: {
        trustWallet: null,
        coinMarketCap: null,
        coinGecko: {
          small:
            "https://coin-images.coingecko.com/coins/images/39384/small/unnamed.png?1721961640",
          large:
            "https://coin-images.coingecko.com/coins/images/39384/large/unnamed.png?1721961640",
        },
      },
      decimals: 18,
      priceUsd: "84474664584",
      maxLtv: "850000000000000000",
      lt: "900000000000000000",
      solvencyOracle: {
        address: "0xb64C4eF733FaEce2ab7014E9A6751A68163cC10b",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      maxLtvOracle: {
        address: "0xb64C4eF733FaEce2ab7014E9A6751A68163cC10b",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      collateralBaseApr: "4721422921979030",
      collateralPrograms: [],
      protectedPrograms: [],
      debtBaseApr: "18423771032592000",
      debtPrograms: [],
      liquidity: "2987516979324981870",
      tvl: "4278096060116585704",
      isNonBorrowable: false,
      collateralPoints: [
        {
          _tag: "sonic",
          multiplier: 2,
        },
        {
          _tag: "solv",
          multiplier: 3,
        },
        {
          _tag: "babylon",
          multiplier: 1,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 1,
        },
      ],
      protectedPoints: [
        {
          _tag: "sonic",
          multiplier: 2,
        },
        {
          _tag: "solv",
          multiplier: 3,
        },
        {
          _tag: "babylon",
          multiplier: 1,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 1,
        },
      ],
      debtPoints: [
        {
          _tag: "silo",
          basePoints: 0.5,
          multiplier: 1,
        },
      ],
      oracleLabel: "RedStone",
      oracleContentKey: "sonic-12-solv-btc-bbn",
    },
    silo1: {
      tokenAddress: "0x541FD749419CA806a8bc7da8ac23D346f2dF8B77",
      symbol: "SolvBTC",
      name: "Solv BTC",
      logos: {
        trustWallet: null,
        coinMarketCap: null,
        coinGecko: {
          small:
            "https://coin-images.coingecko.com/coins/images/36800/small/solvBTC.png?1719810684",
          large:
            "https://coin-images.coingecko.com/coins/images/36800/large/solvBTC.png?1719810684",
        },
      },
      decimals: 18,
      priceUsd: "84915032769",
      maxLtv: "850000000000000000",
      lt: "900000000000000000",
      solvencyOracle: {
        address: "0x781e40467A6DF17c5C1dA6267294E727A64c2b72",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      maxLtvOracle: {
        address: "0x781e40467A6DF17c5C1dA6267294E727A64c2b72",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      collateralBaseApr: "466240226426689",
      collateralPrograms: [],
      protectedPrograms: [],
      debtBaseApr: "5789662325568000",
      debtPrograms: [],
      liquidity: "2610374682702973377",
      tvl: "2885330542610870802",
      isNonBorrowable: false,
      collateralPoints: [
        {
          _tag: "sonic",
          multiplier: 2,
        },
        {
          _tag: "solv",
          multiplier: 3,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 1,
        },
      ],
      protectedPoints: [
        {
          _tag: "sonic",
          multiplier: 2,
        },
        {
          _tag: "solv",
          multiplier: 3,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 1,
        },
      ],
      debtPoints: [
        {
          _tag: "silo",
          basePoints: 0.5,
          multiplier: 1,
        },
      ],
      oracleLabel: "RedStone",
      oracleContentKey: "sonic-12-solv-btc",
    },
  },
  {
    protocolKey: "sonic",
    id: "28",
    isVerified: true,
    configAddress: "0xA3BF8b1eE377bBe6152A6885eaeE8747dcBEa35D",
    boostedContentKey: "sonic-sts-s-28",
    silo0: {
      tokenAddress: "0xE5DA20F15420aD15DE0fa650600aFc998bbE3955",
      symbol: "stS",
      name: "Beets Staked Sonic",
      logos: {
        trustWallet: null,
        coinMarketCap: null,
        coinGecko: {
          small:
            "https://coin-images.coingecko.com/coins/images/52937/small/token-beets-staked-sonic.png?1734712659",
          large:
            "https://coin-images.coingecko.com/coins/images/52937/large/token-beets-staked-sonic.png?1734712659",
        },
      },
      decimals: 18,
      priceUsd: "745008",
      maxLtv: "950000000000000000",
      lt: "970000000000000000",
      solvencyOracle: {
        address: "0x2CDAc4D76E84E61d5954c46a92587426941A13F3",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      maxLtvOracle: {
        address: "0x2CDAc4D76E84E61d5954c46a92587426941A13F3",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      collateralBaseApr: "7502072706447941",
      collateralPrograms: [],
      protectedPrograms: [],
      debtBaseApr: "26920435663440000",
      debtPrograms: [],
      liquidity: "23953684137493297149030",
      tvl: "35737372215578261262397",
      isNonBorrowable: false,
      collateralPoints: [
        {
          _tag: "sonic",
          multiplier: 8,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 1,
        },
      ],
      protectedPoints: [
        {
          _tag: "sonic",
          multiplier: 8,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 1,
        },
      ],
      debtPoints: [
        {
          _tag: "silo",
          basePoints: 0.5,
          multiplier: 1,
        },
      ],
      oracleLabel: "RedStone",
      oracleContentKey: "sonic-sts-s-3",
    },
    silo1: {
      tokenAddress: "0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38",
      symbol: "S",
      name: "Sonic",
      logos: {
        trustWallet: null,
        coinMarketCap: null,
        coinGecko: {
          small:
            "https://coin-images.coingecko.com/coins/images/52857/small/wrapped_sonic.png?1734536585",
          large:
            "https://coin-images.coingecko.com/coins/images/52857/large/wrapped_sonic.png?1734536585",
        },
      },
      decimals: 18,
      priceUsd: "736624",
      maxLtv: "700000000000000000",
      lt: "750000000000000000",
      solvencyOracle: {
        address: "0x0000000000000000000000000000000000000000",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      maxLtvOracle: {
        address: "0x0000000000000000000000000000000000000000",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      collateralBaseApr: "18831932443922541",
      collateralPrograms: [],
      protectedPrograms: [],
      debtBaseApr: "42651949016016000",
      debtPrograms: [],
      liquidity: "28162731208098440757935",
      tvl: "58604231952178724876097",
      isNonBorrowable: false,
      collateralPoints: [
        {
          _tag: "sonic",
          multiplier: 8,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 2,
        },
      ],
      protectedPoints: [
        {
          _tag: "sonic",
          multiplier: 8,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 2,
        },
      ],
      debtPoints: [
        {
          _tag: "silo",
          basePoints: 0.5,
          multiplier: 1,
        },
      ],
      oracleLabel: "RedStone",
      oracleContentKey: "sonic-sts-s-3",
    },
  },
  {
    protocolKey: "sonic",
    id: "25",
    isVerified: true,
    configAddress: "0x6BdF0D12d4B534d5F46c53a90ddDFBe6C0e85dC7",
    boostedContentKey: null,
    silo0: {
      tokenAddress: "0xfA85Fe5A8F5560e9039C04f2b0a90dE1415aBD70",
      symbol: "wanS",
      name: "Wrapped anS",
      logos: {
        trustWallet: null,
        coinMarketCap: null,
        coinGecko: null,
      },
      decimals: 18,
      priceUsd: "740744",
      maxLtv: "900000000000000000",
      lt: "950000000000000000",
      solvencyOracle: {
        address: "0x7Fa198e15b697dEB4589F4C688B6B0653aBb1ddb",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      maxLtvOracle: {
        address: "0x7Fa198e15b697dEB4589F4C688B6B0653aBb1ddb",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      collateralBaseApr: "0",
      collateralPrograms: [],
      protectedPrograms: [],
      debtBaseApr: "31536000",
      debtPrograms: [],
      liquidity: "0",
      tvl: "29882170287344870357",
      isNonBorrowable: true,
      collateralPoints: [
        {
          _tag: "sonic",
          multiplier: 8,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 1,
        },
      ],
      protectedPoints: [
        {
          _tag: "sonic",
          multiplier: 8,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 1,
        },
      ],
      debtPoints: [
        {
          _tag: "silo",
          basePoints: 0.5,
          multiplier: 1,
        },
      ],
      oracleLabel: "Custom Oracle",
      oracleContentKey: "sonic-25-wans",
    },
    silo1: {
      tokenAddress: "0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38",
      symbol: "S",
      name: "Sonic",
      logos: {
        trustWallet: null,
        coinMarketCap: null,
        coinGecko: {
          small:
            "https://coin-images.coingecko.com/coins/images/52857/small/wrapped_sonic.png?1734536585",
          large:
            "https://coin-images.coingecko.com/coins/images/52857/large/wrapped_sonic.png?1734536585",
        },
      },
      decimals: 18,
      priceUsd: "736624",
      maxLtv: "0",
      lt: "0",
      solvencyOracle: {
        address: "0x0000000000000000000000000000000000000000",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      maxLtvOracle: {
        address: "0x0000000000000000000000000000000000000000",
        oracleKey: "none",
        baseToken: null,
        quoteToken: null,
        name: null,
      },
      collateralBaseApr: "0",
      collateralPrograms: [],
      protectedPrograms: [],
      debtBaseApr: "31536000",
      debtPrograms: [],
      liquidity: "52200005370318861764",
      tvl: "52200005370318861764",
      isNonBorrowable: false,
      collateralPoints: [
        {
          _tag: "sonic",
          multiplier: 8,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 2,
        },
      ],
      protectedPoints: [
        {
          _tag: "sonic",
          multiplier: 8,
        },
        {
          _tag: "silo",
          basePoints: 1,
          multiplier: 2,
        },
      ],
      debtPoints: [
        {
          _tag: "silo",
          basePoints: 0.5,
          multiplier: 1,
        },
      ],
      oracleLabel: null,
      oracleContentKey: "sonic-25-s",
    },
  },
];
