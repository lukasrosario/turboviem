import { type Account, type Address, type Chain, type Client, toHex, type Transport } from 'viem'
import type { Call } from '../../types/transaction.js'
import type { WalletRpcSchema } from '../../types/wallet.js'
import { deepHexlify } from '../../utils/deepHexlify.js'

export type SendTransactionParameters = {
  chainId: number
  sender: Address
  calls: Call[]
  gas?: bigint
  capabilities?: Record<string, any>
}

export const sendTransaction = async <
  transport extends Transport = Transport,
  chain extends Chain | undefined = Chain | undefined,
  account extends Account | undefined = Account | undefined,
>(
  client: Client<transport, chain, account, WalletRpcSchema>,
  args: SendTransactionParameters,
): Promise<string> => {
  const { chainId, sender, gas, calls, capabilities } = args

  const transactionIdentifier = await client.request({
    method: 'wallet_sendTransaction',
    params: [
      { chainId: toHex(chainId), sender, gas: gas ? toHex(gas) : undefined, calls: deepHexlify(calls), capabilities },
    ],
  })

  return transactionIdentifier
}
