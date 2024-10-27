# SigmaHop - Frontend

A seamless cross-chain USDC bridge powered by Wormhole & Circle's CCTP.

![Made-With-React](https://img.shields.io/badge/MADE%20WITH-NEXT-000000.svg?colorA=222222&style=for-the-badge&logoWidth=14&logo=nextdotjs)
![Made-With-Tailwind](https://img.shields.io/badge/MADE%20WITH-TAILWIND-06B6D4.svg?colorA=222222&style=for-the-badge&logoWidth=14&logo=tailwindcss)
![Made-With-Javascript](https://img.shields.io/badge/MADE%20WITH-Javascript-ffd000.svg?colorA=222222&style=for-the-badge&logoWidth=14&logo=javascript)
![Made-With-Wormhole](https://img.shields.io/badge/MADE%20WITH-wormhole-ffffff.svg?colorA=222222&style=for-the-badge&logoWidth=14)
![Made-With-Avalanche](https://img.shields.io/badge/Deployed%20on-Avalanche-ff0000.svg?colorA=222222&style=for-the-badge&logoWidth=14)
![Made-With-Optimism](https://img.shields.io/badge/Deployed%20on-Optimism-ff0000.svg?colorA=222222&style=for-the-badge&logoWidth=14)
![Made-With-Base](https://img.shields.io/badge/Deployed%20on-Base-0000ff.svg?colorA=222222&style=for-the-badge&logoWidth=14)
![Made-With-Noir](https://img.shields.io/badge/MADE%20WITH-CIRCLE-ffffff.svg?colorA=22222&style=for-the-badge&logoWidth=14)

> Sigma Hop enables users to transfer USDC across multiple testnets with a single signature:
>
> - Optimism Sepolia
> - Avalanche Fuji
> - Base Sepolia

---

This is the frontend for _[sigmahop.tech](https://sigmahop.tech/)_ which is built during the _[Sigma Sprint](https://sigma.wormhole.com/)_.

> **Dependencies**
>
> - [Sigma_Contracts](https://github.com/SigmaHop/sigma_contracts)
> - [Sigma_Backend](https://github.com/SigmaHop/sigma_backend)

> **Pre-requisites:**
>
> - Setup Node.js v18+ (recommended via [nvm](https://github.com/nvm-sh/nvm) with `nvm install 18`)
> - Install [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
> - Clone this repository

```bash
# Install dependencies
npm install

# fill environments
cp .env.local.example .env.local
```

## Development

```bash
# Start development server
npm run dev

# Build production frontend & start server
npm run build
npm run start
```
