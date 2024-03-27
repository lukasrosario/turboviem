# turboviem

## Installation

```bash
bun install turboviem
```

## Usage

```typescript
import {
  getCapabilities,
  getTransactionStatus,
  sendTransaction,
} from 'turboviem/actions'
import { createWalletClient, custom, http } from 'viem'
import { base } from 'viem/chains'

// create wallet client
export const walletClient = createWalletClient({
  chain: base,
  transport: custom(window.ethereum),
})

// get capabilities
const capabilities = await getCapabilities(walletClient)

// send transaction
const transactionId = await sendTransaction(walletClient, {
  chainId: 84532,
  sender: address,
  capabilities: { paymasterService: { url: 'https://paymaster.base.org' } },
  calls: [
    {
      target: usdc,
      data: encodeFunctionData({
        abi: erc20Abi,
        functionName: 'approve',
        args: [swapper, parseUnits('10', 6)],
      }),
    },
    {
      target: swapper,
      data: encodeFunctionData({
        abi: swapperAbi,
        functionName: 'swap',
        args: [parseUnits('10', 6), parseUnits('0.1', 18)],
      }),
    },
  ],
})

// get transaction status
const transactionStatus = await getTransactionStatus(walletClient, {
  transactionId,
})
```
